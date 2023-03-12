import bodyParser from 'body-parser';
import compress from 'compression';
import errorHandler from 'errorhandler';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import http from 'http';
import httpStatus from 'http-status';
import Logger from '../../../Contexts/Shared/Domain/Logger';
import { registerRoutes } from './Routes';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';
import io from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from './Events/events';
import { registerEvents } from './Events/registerEvents';
import { DependencyInjector } from './dependency-injection/dependencyInjector';
import { ApolloServer } from '@apollo/server';
import { getSchema } from './schema';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';

const SQLiteStore = require('connect-sqlite3')(session);

export class Server {
  private express: express.Express;
  private port: string;
  private logger: Logger;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    const corsConfig = {
      origin: 'http://localhost:3000',
      credentials: true
    };

    this.express.use(cors(corsConfig));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(cookieParser());
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: 'deny' }));
    this.express.use(compress());
    this.express.use(
      session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new SQLiteStore()
      })
    );
    const spec = path.join(__dirname, 'openapi.yaml');
    this.express.use('/spec', express.static(spec));
    this.express.use(passport.authenticate('session'));
    const router = Router();
    router.use(errorHandler());
    this.express.use(router);
    DependencyInjector.init();
    this.logger = DependencyInjector.get(Logger);
    registerRoutes(router);

    router.use((err: Error, req: Request, res: Response, next: Function) => {
      this.logger.error(err.stack ?? new Error(err.message));
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    });
  }

  async listen(): Promise<void> {
    return new Promise(async resolve => {
      const server = http.createServer(this.express);
      const socketServer = new io.Server<ClientToServerEvents, ServerToClientEvents>(server, {
        cors: {
          origin: 'http://localhost:3000',
          methods: ['GET', 'POST'],
          credentials: true
        }
      });
      registerEvents(socketServer);
      const apolloServer = new ApolloServer({
        schema: await getSchema(),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer: server })]
      });
      await apolloServer.start();

      this.express.use(
        '/',
        cors<cors.CorsRequest>(),
        bodyParser.json(),
        expressMiddleware(apolloServer)
      );
      this.httpServer = server.listen(this.port, () => {
        this.logger.info(
          `Crypto Wars Backend App is running at http://localhost:${
            this.port
          } in ${this.express.get('env')} mode`
        );
        this.logger.info('Press CTRL-C to stop');
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
