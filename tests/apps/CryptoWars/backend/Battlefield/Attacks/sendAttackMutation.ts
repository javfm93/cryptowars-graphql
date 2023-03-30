import { gql } from '../../__generated__';

export const SEND_ATTACK = gql(/* GraphQL */ `
  mutation SendAttack($input: SendAttackInput!) {
    SendAttack(input: $input) {
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
