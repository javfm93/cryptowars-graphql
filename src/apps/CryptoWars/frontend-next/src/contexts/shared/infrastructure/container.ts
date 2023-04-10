import { UserRepository } from '@/contexts/IAM/users/domain/userRepository'
import { GraphqlUserRepository } from '@/contexts/IAM/users/infrastructure/GraphqlUserRepository'
import { ArmyRepository } from '@/contexts/battlefield/armies/domain/ArmyRepository'
import { GraphqlArmyRepository } from '@/contexts/battlefield/armies/infrastructure/GraphqlArmyRepository'
import { BattleRepository } from '@/contexts/battlefield/battles/domain/BattleRepository'
import { GraphqlBattleRepository } from '@/contexts/battlefield/battles/infrastructure/GraphqlBattleRepository'
import { PlayerRepository } from '@/contexts/cryptoWars/players/domain/PlayerRepository'
import { GraphqlPlayerRepository } from '@/contexts/cryptoWars/players/infrastructure/GraphqlPlayerRepository'
import { TownRepository } from '@/contexts/cryptoWars/towns/domain/TownRepository'
import { GraphqlTownRepository } from '@/contexts/cryptoWars/towns/infrastructure/GraphqlTownRepository'
import { WorldRepository } from '@/contexts/cryptoWars/worlds/domain/WorldRepository'
import { GraphqlWorldRepository } from '@/contexts/cryptoWars/worlds/infrastructure/GraphqlWorldRepository'
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
builder.register(BattleRepository).use(GraphqlBattleRepository)
export const container = builder.build()
