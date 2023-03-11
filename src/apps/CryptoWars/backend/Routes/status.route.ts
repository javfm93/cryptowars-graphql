import { Express } from 'express';
import StatusController from '../Controllers/StatusGetController';
import { DependencyInjector } from '../dependency-injection/dependencyInjector';

export const register = (app: Express) => {
  const controller = DependencyInjector.get(StatusController);
  app.get('/status', controller.run.bind(controller));
};
