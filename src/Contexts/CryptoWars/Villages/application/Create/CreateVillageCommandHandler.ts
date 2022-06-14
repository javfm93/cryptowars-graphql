import { CommandHandler } from '../../../../Shared/Domain/CommandHandler';
import { CreateVillageCommand } from './CreateVillageCommand';
import { Command } from '../../../../Shared/Domain/Command';
import { VillageId } from '../../domain/VillageId';
import { CreateVillage } from './CreateVillage';

export class CreateVillageCommandHandler implements CommandHandler<CreateVillageCommand> {
  constructor(private createVillage: CreateVillage) {}

  subscribedTo(): Command {
    return CreateVillageCommand;
  }

  async handle(command: CreateVillageCommand): Promise<void> {
    const id = VillageId.create(command.id);
    await this.createVillage.execute({ id });
  }
}
