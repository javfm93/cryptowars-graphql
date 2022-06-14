import { CreateVillageCommand } from '../../../../../src/Contexts/CryptoWars/Villages/application/Create/CreateVillageCommand';
import { UuidGenerator } from '../../../Shared/domain/UuidGenerator';

export class CreateVillageCommandGenerator {
  static create(id: string): CreateVillageCommand {
    return new CreateVillageCommand({ id });
  }

  static random(): CreateVillageCommand {
    return this.create(UuidGenerator.random().toString());
  }
}
