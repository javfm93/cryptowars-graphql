import { Class } from '../../../../Contexts/Shared/Domain/Primitives';
import { ComponentTags, DependencyInjector } from '../dependency-injection/dependencyInjector';

export interface BaseResolver {}

export const RegisterResolver = () => {
  return (target: Class<any>): Class<any> => {
    DependencyInjector.registerAndUse(target).addTag(ComponentTags.resolver);
    return target;
  };
};
