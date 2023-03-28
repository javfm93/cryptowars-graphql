import fetch, { RequestInfo, RequestInit } from 'node-fetch';
import { CryptoWarsBackendApp } from '../../../../src/apps/CryptoWars/backend/CryptoWarsBackendApp';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { DependencyInjector } from '../../../../src/apps/CryptoWars/backend/dependency-injection/dependencyInjector';
import { EnvironmentArranger } from '../../../Contexts/Shared/Infrastructure/arranger/EnvironmentArranger';

let app: CryptoWarsBackendApp;
beforeAll(async () => {
  app = new CryptoWarsBackendApp();
  await app.start();
});

beforeEach(async () => {
  const environmentArranger = DependencyInjector.get(EnvironmentArranger);
  await environmentArranger.arrange();
  client = new ApolloClient({
    cache: new InMemoryCache(),
    link
  });
  otherClient = new ApolloClient({
    cache: new InMemoryCache(),
    link
  });
});

afterAll(async () => {
  await app.stop();
});

let cookie: string;
const customFetch = (uri: RequestInfo, options: RequestInit) => {
  if (cookie) {
    // @ts-ignore
    options.headers.Cookie = cookie;
  }
  return fetch(uri, options).then(response => {
    const setCookieHeader = response.headers.get('Set-Cookie');
    if (setCookieHeader) {
      cookie = setCookieHeader;
    }
    return response;
  });
};

const link = createHttpLink({
  uri: `http://localhost:5000`,
  // @ts-ignore
  fetch: customFetch,
  credentials: 'include'
});

export let client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});
export let otherClient = new ApolloClient({
  cache: new InMemoryCache(),
  link
});
