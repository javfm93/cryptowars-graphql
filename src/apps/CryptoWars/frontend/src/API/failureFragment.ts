import { gql } from '../../../../../../tests/apps/CryptoWars/backend/__generated__';

export const failureFragment = gql(/* GraphQL */ `
  fragment Failure on BaseError {
    error
    message
    status
  }
`);
