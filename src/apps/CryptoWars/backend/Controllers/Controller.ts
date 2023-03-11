import { Request, Response } from 'express';
import { Class } from '../../../../Contexts/Shared/Domain/Primitives';
import { ComponentTags, DependencyInjector } from '../dependency-injection/dependencyInjector';

export abstract class Controller {
  abstract run(req: Request, res: Response): Promise<void>;
}

export const RegisterController = () => {
  return (target: Class<any>): Class<any> => {
    DependencyInjector.registerAndUse(target).addTag(ComponentTags.controller);
    return target;
  };
};
