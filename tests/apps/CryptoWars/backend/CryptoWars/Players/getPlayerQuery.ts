import { gql } from '../../__generated__';

export const GET_PLAYER = gql(/* GraphQL */ `
  query GetPlayer {
    GetPlayer {
        id
        userId
        towns {
          id
          playerId
          worldId
          buildings {
            headquarter {
              level
              essenceRequiredToLevelUp
              type
              units {
                name
                speed
                capacity
                time
                cost
              }
            }
            essenceGenerator {
              level
              essenceRequiredToLevelUp
              type
              asset
              generationPerHour
            }
            warehouse {
              level
              essenceRequiredToLevelUp
              type
              assets {
                essence {
                  name
                  limit
                  stored
                  lastStorageUpdate
                }
              }
            }
          }
        }
        worlds {
          id
          name
        }
    }
  }
`);
