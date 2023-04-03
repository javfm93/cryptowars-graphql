import 'reflect-metadata';

import '@/styles/globals.css';
import { ApolloProvider, InMemoryCache } from '@apollo/client';
import { ApolloClient } from '@apollo/client/core';
import type { AppProps } from 'next/app';

export const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache(),
  credentials: 'include'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
