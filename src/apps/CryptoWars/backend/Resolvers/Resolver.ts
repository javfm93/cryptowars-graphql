import { Class } from '../../../../Contexts/Shared/Domain/Primitives';
import { ComponentTags, DependencyInjector } from '../dependency-injection/dependencyInjector';
import { Resolver as GraphqlResolver } from 'type-graphql';

export interface BaseResolver {}

export function Resolver<T extends BaseResolver>() {
  return function (target: Class<T>) {
    RegisterResolver()(target);
    GraphqlResolver()(target);
  };
}

export const RegisterResolver = () => {
  return (target: Class<any>): Class<any> => {
    DependencyInjector.registerAndUse(target).addTag(ComponentTags.resolver);
    return target;
  };
};
