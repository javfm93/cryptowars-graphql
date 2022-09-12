import { SelectWorldCommand } from '../../../../../src/Contexts/CryptoWars/Players/Application/SelectWorld/SelectWorldCommand';
import { UserIdGenerator } from '../../Users/domain/UserIdGenerator';
import { WorldIdGenerator } from '../../Worlds/Domain/WorldIdGenerator';

export class SelectWorldCommandGenerator {
  static create(userId: string, worldId: string): SelectWorldCommand {
    return new SelectWorldCommand({ userId, worldId });
  }

  static random(): SelectWorldCommand {
    return this.create(UserIdGenerator.random().toString(), WorldIdGenerator.random().toString());
  }
}
