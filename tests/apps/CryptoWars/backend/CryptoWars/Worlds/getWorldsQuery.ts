import { gql } from '../../__generated__';

export const WORLDS = gql(/* GraphQL */ `
  query GetWorlds {
    GetWorlds {
      worlds {
        id
        name
      }
    }
  }
`);
