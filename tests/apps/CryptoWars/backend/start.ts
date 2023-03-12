import { execute } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { GraphQLRequest } from 'apollo-link/lib/types';
import fetch from 'node-fetch';
import { CryptoWarsBackendApp } from '../../../../src/apps/CryptoWars/backend/CryptoWarsBackendApp';

export const startTestServer = async () => {
  const app = new CryptoWarsBackendApp();
  await app.start();

  const link = createHttpLink({
    uri: `http://localhost:5000`,
    // @ts-ignore
    fetch
  });

  const executeOperation = (operation: GraphQLRequest) => execute(link, operation);

  return {
    link,
    stop: () => app.stop(),
    executeOperation
  };
};
