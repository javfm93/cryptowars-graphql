import { gql } from '../../__generated__';

export const LOGIN = gql(/* GraphQL */ `
  mutation Login($login: LoginInput!) {
    Login(login: $login) {
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
