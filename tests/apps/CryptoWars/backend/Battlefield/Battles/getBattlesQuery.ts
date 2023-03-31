import { gql } from '../../__generated__';

export const GET_BATTLES = gql(/* GraphQL */ `
  query Battles($armyId: String!) {
    GetBattles(armyId: $armyId) {
      battles {
        id
        attack {
          id
          attackerTroop {
            armyId
          }
          defenderArmyId
          sentAt
        }
        defenderArmy {
          id
          playerId
          townId
          squads {
            basic
            range
          }
        }
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
          }
        }
      }
    }
  }
`);
