import { CommandResult, Result } from '@/contexts/shared/application/result'
import {
  GetWorldMapQuery,
  GetWorldsQuery,
  JoinWorldErrors,
  UnexpectedError
} from '@/contexts/shared/domain/__generated__/graphql'

export abstract class WorldRepository {
  abstract getWorlds(): Promise<Result<GetWorldsQuery['GetWorlds'], UnexpectedError>>
  abstract getWorldMap(
    id: string
  ): Promise<Result<GetWorldMapQuery['GetWorldMap'], UnexpectedError>>

  abstract joinWorld(id: string): Promise<CommandResult<JoinWorldErrors>>
}
