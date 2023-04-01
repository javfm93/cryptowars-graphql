import { gql } from '@/__generated__';

export const failureFragment = gql(/* GraphQL */ `
  fragment Failure on BaseError {
    error
    message
    status
  }
`);
