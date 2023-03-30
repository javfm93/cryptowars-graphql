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
import io from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from './Events/events';
import { registerEvents } from './Events/registerEvents';
import { DependencyInjector } from './dependency-injection/dependencyInjector';
import { ApolloServer } from '@apollo/server';
import { getSchema } from './schema';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { buildContext, GraphQLLocalStrategy } from 'graphql-passport';
import { UserRepository } from '../../../Contexts/IAM/Users/Domain/UserRepository';
import { UserEmail } from '../../../Contexts/IAM/Users/Domain/UserEmail';
import { PlayerRepository } from '../../../Contexts/CryptoWars/Players/Domain/PlayerRepository';
import { Context } from 'graphql-passport/lib/buildContext';

const SQLiteStore = require('connect-sqlite3')(session);
export type ContextUser = {
  id: string;
  playerId: string;
};
export type ServerContext = Context<ContextUser>;

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true
};

export class Server {
  private express: express.Express;
  private port: string;
  private logger: Logger;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();

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
    this.express.use(passport.initialize());
    this.express.use(passport.session()); // if session is used
    passport.use(
      new GraphQLLocalStrategy(async (e, p, done) => {
        try {
          const email = e as string;
          const password = p as string;
          const userRepository = DependencyInjector.get(UserRepository);
          const user = await userRepository.findByEmail(UserEmail.fromPrimitives(email));
          if (!user) return done({ message: 'Incorrect username or password.' });
          // const hash = hashPassword(password);
          // const passwordMatches = matchPassword(password, hash);
          // if (!passwordMatches) return done({ message: 'Incorrect username or password.' });
          if (!user.password.isEqualTo(password))
            return done({ message: 'Incorrect username or password.' });

          const playerRepository = DependencyInjector.get(PlayerRepository);
          const player = await playerRepository.findByUserId(user.id, { retrieveRelations: false });
          if (!player) return done({ message: 'Not registered as a player' });
          return done(null, {
            id: user.id.toString(),
            playerId: player.id.toString()
          });
        } catch (err) {
          if (err) {
            return done(err);
          }
        }
      })
    );
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
      const apolloServer = new ApolloServer<ServerContext>({
        schema: getSchema(),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer: server })]
      });
      await apolloServer.start();

      this.express.use(
        '/',
        cors<cors.CorsRequest>(corsConfig),
        bodyParser.json(),
        expressMiddleware(apolloServer, {
          context: async ({ req, res }) => buildContext<ContextUser>({ req, res })
        })
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
