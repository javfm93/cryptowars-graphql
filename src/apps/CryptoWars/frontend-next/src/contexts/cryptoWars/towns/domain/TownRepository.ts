import { CommandResult, Result } from '@/contexts/shared/application/result'
import {
  PlayerTownHeadQuarterQuery,
  PlayerTownHeaderQuery,
  PlayerTownQuery,
  PlayerTownsQuery,
  UnexpectedError
} from '@/contexts/shared/domain/__generated__/graphql'
import { TownSoldiers, TrainSoldiersErrors } from '../../../shared/domain/__generated__/graphql'

export abstract class TownRepository {
  abstract getTowns(): Promise<Result<PlayerTownsQuery['GetPlayerTowns'], UnexpectedError>>
  abstract getTown(id: string): Promise<Result<PlayerTownQuery['GetPlayerTown'], UnexpectedError>>
  abstract getTownHeader(
    id: string
  ): Promise<Result<PlayerTownHeaderQuery['GetPlayerTown'], UnexpectedError>>

  abstract getPlayerTownHeadquarter(
    id: string
  ): Promise<Result<PlayerTownHeadQuarterQuery['GetPlayerTown'], UnexpectedError>>

  abstract trainSoldiers(
    townId: string,
    soldiers: TownSoldiers
  ): Promise<CommandResult<TrainSoldiersErrors>>
}
