import { buildSchema } from 'type-graphql';
import { DependencyInjector } from './dependency-injection/dependencyInjector';

export const getSchema = async () =>
  buildSchema({
    resolvers: [__dirname + '/Resolvers/**/*Resolver.*'],
    container: DependencyInjector.getContainer(),
    emitSchemaFile: true
  });
