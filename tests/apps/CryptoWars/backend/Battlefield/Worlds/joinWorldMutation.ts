import { gql } from '../../__generated__';

export const JOIN_WORLD = gql(/* GraphQL */ `
  mutation JoinWorld($id: String!) {
    JoinWorld(id: $id) {
      ... on SuccessCommand {
        isSuccess
      }
      ... on BaseError {
        error
        message
        status
      }
    }
  }
`);
