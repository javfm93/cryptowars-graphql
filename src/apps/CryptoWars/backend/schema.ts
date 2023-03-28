import { buildSchemaSync } from 'type-graphql';
import { DependencyInjector } from './dependency-injection/dependencyInjector';

export const getSchema = () =>
  buildSchemaSync({
    resolvers: [__dirname + '/Resolvers/**/*Resolver.*'],
    container: DependencyInjector.getContainer(),
    emitSchemaFile: true
  });
