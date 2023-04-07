import { Result, failure, successAndReturn } from '@/contexts/shared/application/result'
import { ErrorFactory } from '@/contexts/shared/domain/Errors'
import { gql } from '@/contexts/shared/domain/__generated__'
import { GetArmyQuery, UnexpectedError } from '@/contexts/shared/domain/__generated__/graphql'
import { ApolloClient } from '@apollo/client'
import { Service } from 'diod'
import { ArmyRepository } from '../domain/ArmyRepository'

@Service()
export class GraphqlArmyRepository implements ArmyRepository {
  constructor(readonly client: ApolloClient<any>) {}

  async getTownArmy(townId: string): Promise<Result<GetArmyQuery['GetArmy'], UnexpectedError>> {
    const data = await this.client.query({ query: townArmyQuery, variables: { townId } })
    if (data.data) return successAndReturn(data.data.GetArmy)
    if (data.errors) {
      return failure(ErrorFactory.unexpected(data.errors[0].message))
    }
    return failure(ErrorFactory.unexpected())
  }
}

export const townArmyQuery = gql(/* GraphQL */ `
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
`)
