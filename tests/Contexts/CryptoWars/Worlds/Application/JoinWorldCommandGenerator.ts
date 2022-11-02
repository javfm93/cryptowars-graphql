import { JoinWorldCommand } from '../../../../../src/Contexts/CryptoWars/Worlds/Application/Join/JoinWorldCommand';
import { UserIdGenerator } from '../../../IAM/Users/Domain/UserIdGenerator';
import { WorldIdGenerator } from '../Domain/WorldIdGenerator';

export class JoinWorldCommandGenerator {
  static create(userId: string, worldId: string): JoinWorldCommand {
    return new JoinWorldCommand({ userId, worldId });
  }

  static random(): JoinWorldCommand {
    return this.create(UserIdGenerator.random().toString(), WorldIdGenerator.random().toString());
  }
}
