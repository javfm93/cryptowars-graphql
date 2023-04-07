import { UserRepository } from '@/contexts/IAM/domain/userRepository'
import { GraphqlUserRepository } from '@/contexts/IAM/infrastructure/GraphqlUserRepository'
import { ArmyRepository } from '@/contexts/battlefield/domain/ArmyRepository'
import { GraphqlArmyRepository } from '@/contexts/battlefield/infrastructure/GraphqlArmyRepository'
import { PlayerRepository } from '@/contexts/cryptoWars/domain/PlayerRepository'
import { TownRepository } from '@/contexts/cryptoWars/domain/TownRepository'
import { WorldRepository } from '@/contexts/cryptoWars/domain/WorldRepository'
import { GraphqlPlayerRepository } from '@/contexts/cryptoWars/infrastructure/GraphqlPlayerRepository'
import { GraphqlTownRepository } from '@/contexts/cryptoWars/infrastructure/GraphqlTownRepository'
import { GraphqlWorldRepository } from '@/contexts/cryptoWars/infrastructure/GraphqlWorldRepository'
import { ApolloClient } from '@apollo/client'
import { ContainerBuilder } from 'diod'
import { initializeApollo } from './apolloClient'

const builder = new ContainerBuilder()
builder
  .register(ApolloClient)
  .useFactory(c => {
    return initializeApollo()
  })
  .asInstancePerRequest()
builder.register(PlayerRepository).use(GraphqlPlayerRepository)
builder.register(UserRepository).use(GraphqlUserRepository)
builder.register(WorldRepository).use(GraphqlWorldRepository)
builder.register(ArmyRepository).use(GraphqlArmyRepository)
builder.register(TownRepository).use(GraphqlTownRepository)
export const container = builder.build()
