import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { CreateVillageCommand } from './CreateVillageCommand';
import { Command } from '../../../../Shared/domain/Command';
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
