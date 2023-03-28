import { gql } from '../../__generated__';

export const WORLD_MAP = gql(/* GraphQL */ `
  query GetWorldMap($id: String!) {
    GetWorldMap(id: $id) {
      id
      name
      towns {
        id
        playerId
      }
    }
  }
`);
