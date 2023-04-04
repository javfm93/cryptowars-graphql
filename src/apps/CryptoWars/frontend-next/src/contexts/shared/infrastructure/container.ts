import { UserRepository } from '@/contexts/IAM/domain/userRepository'
import { GraphqlUserRepository } from '@/contexts/IAM/infrastructure/GraphqlUserRepository'
import { PlayerRepository } from '@/contexts/cryptoWars/domain/playerRepository'
import { GraphqlPlayerRepository } from '@/contexts/cryptoWars/infrastructure/GraphqlPlayerRepository'
import { ApolloClient } from '@apollo/client'
import { ContainerBuilder } from 'diod'
import { initializeApollo } from './apolloClient'

const builder = new ContainerBuilder()
builder.register(ApolloClient).useFactory((c) => {
  return initializeApollo()
}).asInstancePerRequest()
builder.register(PlayerRepository).use(GraphqlPlayerRepository)
builder.register(UserRepository).use(GraphqlUserRepository)
export const container = builder.build()

