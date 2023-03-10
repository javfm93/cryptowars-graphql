import { Query } from './Query';
import { Response } from './Response';
import { Class } from './Primitives';

export interface QueryHandler<Q extends Query, R extends Response> {
  subscribedTo(): Query;
  handle(query: Q): Promise<R>;
}

export const registeredQueryHandlers: Class<any>[] = [];

export const RegisterQueryHandler = () => {
  console.log('registering a query handler');
  return (target: Class<any>): Class<any> => {
    registeredQueryHandlers.push(target);
    return target;
  };
};
