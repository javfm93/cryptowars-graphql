import { CommandResult, Result } from '@/contexts/shared/application/result';
import { GetWorldsQuery, JoinWorldErrors, UnexpectedError } from '@/contexts/shared/domain/__generated__/graphql';

export abstract class WorldRepository {
  abstract getWorlds(): Promise<Result<GetWorldsQuery["GetWorlds"], UnexpectedError>>;
  abstract joinWorld(id: string): Promise<Promise<CommandResult<JoinWorldErrors>>>;
}