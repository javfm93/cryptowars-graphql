import { gql } from '../../__generated__';

export const CREATE_USER = gql(/* GraphQL */ `
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
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
