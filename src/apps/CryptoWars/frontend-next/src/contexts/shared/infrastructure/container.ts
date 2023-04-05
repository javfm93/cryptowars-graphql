import { UserRepository } from '@/contexts/IAM/domain/userRepository'
import { GraphqlUserRepository } from '@/contexts/IAM/infrastructure/GraphqlUserRepository'
import { PlayerRepository } from '@/contexts/cryptoWars/domain/PlayerRepository'
import { WorldRepository } from '@/contexts/cryptoWars/domain/WorldRepository'
import { GraphqlPlayerRepository } from '@/contexts/cryptoWars/infrastructure/GraphqlPlayerRepository'
import { GraphqlWorldRepository } from '@/contexts/cryptoWars/infrastructure/GraphqlWorldRepository'
import { ApolloClient } from '@apollo/client'
import { ContainerBuilder } from 'diod'
import { initializeApollo } from './apolloClient'

const builder = new ContainerBuilder()
builder.register(ApolloClient).useFactory((c) => {
  return initializeApollo()
}).asInstancePerRequest()
builder.register(PlayerRepository).use(GraphqlPlayerRepository)
builder.register(UserRepository).use(GraphqlUserRepository)
builder.register(WorldRepository).use(GraphqlWorldRepository)
export const container = builder.build()

