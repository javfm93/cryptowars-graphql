import { CommandHandler } from '../../../../Shared/Domain/CommandHandler';
import { CreateVillageCommand } from './CreateVillageCommand';
import { Command } from '../../../../Shared/Domain/Command';
import { VillageId } from '../../Domain/VillageId';
import { CreateVillage } from './CreateVillage';
import { Either, EmptyResult, success } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';

export type CreateVillageCommandResult = Either<EmptyResult, DomainError>;

export class CreateVillageCommandHandler implements CommandHandler<CreateVillageCommand> {
  constructor(private createVillage: CreateVillage) {}

  subscribedTo(): Command {
    return CreateVillageCommand;
  }

  async handle(command: CreateVillageCommand): Promise<CreateVillageCommandResult> {
    const id = VillageId.create(command.id);
    await this.createVillage.execute({ id });
    return success();
  }
}
