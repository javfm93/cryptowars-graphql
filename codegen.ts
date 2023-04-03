import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'schema.gql',
  documents: [
    './tests/apps/CryptoWars/backend/**/**/*Mutation.ts',
    './tests/apps/CryptoWars/backend/**/**/*Query.ts',
    './src/apps/CryptoWars/frontend/src/**/**/*.{ts,tsx}',
    './src/apps/CryptoWars/frontend/src/**/**/**/*.{ts,tsx}',
  ],
  generates: {
    './tests/apps/CryptoWars/backend/__generated__/': {
      preset: 'client',
      // plugins: ['typescript', 'typescript-operations'],
      presetConfig: {
        gqlTagName: 'gql'
      }
    },
    './src/apps/CryptoWars/frontend-next/src/contexts/shared/domain/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql'
      }
    },
  },
  ignoreNoDocuments: true
};

export default config;
