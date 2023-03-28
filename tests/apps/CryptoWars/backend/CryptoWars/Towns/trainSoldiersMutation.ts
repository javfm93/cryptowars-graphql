import { gql } from '../../__generated__';

export const TRAIN_SOLDIERS = gql(/* GraphQL */ `
  mutation TrainSoldiers($input: TrainSoldiersInput!) {
    TrainSoldiers(input: $input) {
      ... on SuccessCommand {
        isSuccess
      }
      ... on InvalidInputError {
        error
        message
        status
      }
      ... on ForbiddenError {
        error
        message
        status
      }
      ... on NotFoundError {
        error
        message
        status
      }
    }
  }
`);
