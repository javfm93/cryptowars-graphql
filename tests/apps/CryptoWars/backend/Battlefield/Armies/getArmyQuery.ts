import { gql } from '../../__generated__';

export const GET_ARMY = gql(/* GraphQL */ `
  query GetArmy($townId: String!) {
    GetArmy(townId: $townId) {
      id
      playerId
      townId
      squads {
        basic
        range
      }
    }
  }
`);
