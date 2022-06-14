import { Village } from '../../../../../src/Contexts/CryptoWars/Villages/Domain/Village';
import { VillageId } from '../../../../../src/Contexts/CryptoWars/Villages/Domain/VillageId';
import { CreateVillageCommand } from '../../../../../src/Contexts/CryptoWars/Villages/Application/Create/CreateVillageCommand';
import { VillageIdGenerator } from './VillageIdGenerator';

export class VillageGenerator {
  static create(id: VillageId): Village {
    return Village.create(id);
  }

  static fromCommand(command: CreateVillageCommand): Village {
    return this.create(VillageIdGenerator.create(command.id));
  }

  static random(): Village {
    return this.create(VillageIdGenerator.random());
  }
}
