import { Request, Response } from 'express';
import { Class } from '../../../../Contexts/Shared/Domain/Primitives';
import { DependencyInjector } from '../dependency-injection/dependencyInjector';

export abstract class Controller {
  abstract run(req: Request, res: Response): Promise<void>;
}

export const RegisterController = () => {
  console.log('registering a controller');
  return (target: Class<any>): Class<any> => {
    DependencyInjector.registerAndUse(target);
    return target;
  };
};
