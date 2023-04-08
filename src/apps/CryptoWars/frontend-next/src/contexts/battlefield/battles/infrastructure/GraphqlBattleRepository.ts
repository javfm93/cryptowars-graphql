import { Result, failure, successAndReturn } from '@/contexts/shared/application/result'
import { ErrorFactory } from '@/contexts/shared/domain/Errors'
import { gql } from '@/contexts/shared/domain/__generated__'
import { ArmyBattlesQuery, UnexpectedError } from '@/contexts/shared/domain/__generated__/graphql'
import { ApolloClient } from '@apollo/client'
import { Service } from 'diod'
import { BattleRepository } from '../domain/BattleRepository'

@Service()
export class GraphqlBattleRepository implements BattleRepository {
  constructor(readonly client: ApolloClient<any>) {}

  async getArmyBattles(
    armyId: string
  ): Promise<Result<ArmyBattlesQuery['GetBattles'], UnexpectedError>> {
    const data = await this.client.query({ query: armyBattlesQuery, variables: { armyId } })
    if (data.data) return successAndReturn(data.data.GetBattles)
    if (data.errors) {
      return failure(ErrorFactory.unexpected(data.errors[0].message))
    }
    return failure(ErrorFactory.unexpected())
  }
}

export const armyBattlesQuery = gql(/* GraphQL */ `
  query ArmyBattles($armyId: String!) {
    GetBattles(armyId: $armyId) {
      battles {
        id
        finishedAt
        defenderArmy {
          townId
        }
        attack {
          sentAt
          attackerTroop {
            squads {
              basic
            }
          }
        }
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
`)
