import bodyParser from 'body-parser';
import compress from 'compression';
import errorHandler from 'errorhandler';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';
import Logger from '../../../Contexts/Shared/Domain/Logger';
import container from './dependency-injection';
import { registerRoutes } from './Routes';
import cors from 'cors';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { UserRepository } from '../../../Contexts/CryptoWars/Users/Domain/UserRepository';
import { UserEmail } from '../../../Contexts/CryptoWars/Users/Domain/UserEmail';
import bcrypt from 'bcrypt';
import session from 'express-session';
import { UserPrimitives } from '../../../Contexts/CryptoWars/Users/Domain/User';
const SQLiteStore = require('connect-sqlite3')(session);
import cookieParser from 'cookie-parser';

export const isAuthenticated = function (req: Request, res: Response, next: any) {
  if (req.isAuthenticated()) return next();
  res.status(httpStatus.UNAUTHORIZED).send();
};

export class Server {
  private express: express.Express;
  private port: string;
  private logger: Logger;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.logger = container.get('Shared.Logger');
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
    this.express.use(passport.authenticate('session'));
    const router = Router();
    router.use(errorHandler());
    this.express.use(router);

    passport.use(
      new LocalStrategy.Strategy(async function verify(email, password, cb) {
        try {
          const repository: UserRepository = container.get('CryptoWars.Users.UserRepository');
          const user = await repository.searchByEmail(UserEmail.fromPrimitive(email));
          if (!user) return cb(null, false, { message: 'Incorrect username or password.' });
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt);
          const passwordMatches = await bcrypt.compare(password, hash);
          if (!passwordMatches)
            return cb(null, false, { message: 'Incorrect username or password.' });

          console.log('user properly auth');
          return cb(null, user.toPrimitives());
        } catch (err) {
          if (err) {
            return cb(err);
          }
        }
      })
    );

    passport.serializeUser(function (user: any, cb) {
      process.nextTick(function () {
        console.log('serialize user', user);
        cb(null, { id: user.id, email: user.email });
      });
    });

    passport.deserializeUser<UserPrimitives>(function (user, cb) {
      console.log('deserialize user', user);
      process.nextTick(function () {
        return cb(null, user);
      });
    });

    registerRoutes(router);
    router.post(
      '/login',
      passport.authenticate('local', { failureMessage: true }),
      function (req, res) {
        res.status(httpStatus.OK).send();
      }
    );
    router.use((err: Error, req: Request, res: Response, next: Function) => {
      this.logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        this.logger.info(
          `  Crypto Wars Backend App is running at http://localhost:${
            this.port
          } in ${this.express.get('env')} mode`
        );
        this.logger.info('  Press CTRL-C to stop\n');
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
