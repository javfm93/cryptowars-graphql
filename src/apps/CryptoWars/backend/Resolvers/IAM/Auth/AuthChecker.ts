import { createMethodDecorator } from 'type-graphql';
import { ServerContext } from '../../../server';
import { ForbiddenError } from '../../ResolverErrors';

export function Authenticated() {
  return createMethodDecorator<ServerContext>(async ({ context }, next) => {
    if (context.isUnauthenticated()) throw new ForbiddenError('Forbidden');
    return next();
  });
}
