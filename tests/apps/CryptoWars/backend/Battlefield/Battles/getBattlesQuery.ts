import { gql } from '../../__generated__';

export const GET_BATTLES = gql(/* GraphQL */ `
  query GetBattles($armyId: String!) {
    GetBattles(armyId: $armyId) {
      battles {
        finishedAt
        result {
          winner
          attackerCasualties {
            basic
            range
          }
          defenderCasualties {
            basic
            range
          }
          returningTroop {
            armyId
            squads {
              basic
              range
            }
          }
        }
      }
    }
  }
`);
