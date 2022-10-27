import { SelectWorldCommand } from './SelectWorldCommand';
import { SelectWorld } from './SelectWorld';
import { Either, EmptyResult } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { CommandClass } from '../../../../Shared/Domain/Command';
import { WorldId } from '../../../Worlds/Domain/WorldId';
import { UserId } from '../../../Users/Domain/UserId';
import { CommandHandler } from '../../../../Shared/Domain/CommandHandler';

export type SelectWorldCommandResult = Either<EmptyResult, DomainError>;

export class SelectWorldCommandHandler implements CommandHandler<SelectWorldCommand> {
  constructor(private selectWorld: SelectWorld) {}

  subscribedTo(): CommandClass {
    return SelectWorldCommand;
  }

  async handle(command: SelectWorldCommand): Promise<SelectWorldCommandResult> {
    const worldId = WorldId.create(command.worldId);
    const userId = UserId.create(command.userId);
    return this.selectWorld.execute({ worldId, userId });
  }
}
