module.exports = {
  projects: {
    app: {
      schema: ['schema.gql'],
      documents: [
        './tests/apps/CryptoWars/backend/**/**/*Mutation.ts',
        './tests/apps/CryptoWars/backend/**/**/*Query.ts',
        './src/apps/CryptoWars/frontend/src/**/**/*.{ts,tsx}',
        './src/apps/CryptoWars/frontend/src/**/**/**/*.{ts,tsx}',
      ],
    },
  }
};
