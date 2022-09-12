import { SelectWorldCommand } from './SelectWorldCommand';
import { SelectWorld } from './SelectWorld';
import { Either, EmptyResult } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { QueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { Command } from '../../../../Shared/Domain/Command';
import { WorldId } from '../../../Worlds/Domain/WorldId';
import { UserId } from '../../../Users/Domain/UserId';

export type SelectWorldCommandResult = Either<EmptyResult, DomainError>;

export class SelectWorldCommandHandler
  implements QueryHandler<SelectWorldCommand, SelectWorldCommandResult>
{
  constructor(private selectWorld: SelectWorld) {}

  subscribedTo(): Command {
    return SelectWorldCommand;
  }

  async handle(command: SelectWorldCommand): Promise<SelectWorldCommandResult> {
    const worldId = WorldId.create(command.worldId);
    const userId = UserId.create(command.userId);
    return this.selectWorld.execute({ worldId, userId });
  }
}
