import { Class } from '../../../../Contexts/Shared/Domain/Primitives';
import { ComponentTags, DependencyInjector } from '../dependency-injection/dependencyInjector';

export const RegisterResolver = () => {
  return (target: Class<any>): Class<any> => {
    DependencyInjector.registerAndUse(target).addTag(ComponentTags.resolver);
    return target;
  };
};

export interface Resolver {}
