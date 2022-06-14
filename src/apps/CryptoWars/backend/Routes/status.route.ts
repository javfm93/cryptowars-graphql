import { Express } from 'express';
import container from '../dependency-injection';
import StatusController from '../Controllers/StatusGetController';

export const register = (app: Express) => {
  const controller: StatusController = container.get(
    'Apps.CryptoWars.Backend.Controllers.StatusGetController'
  );
  app.get('/status', controller.run.bind(controller));
};
