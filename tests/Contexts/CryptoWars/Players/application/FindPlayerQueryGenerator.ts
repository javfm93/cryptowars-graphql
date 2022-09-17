import { UserIdGenerator } from '../../Users/domain/UserIdGenerator';
import { FindPlayerQuery } from '../../../../../src/Contexts/CryptoWars/Players/Application/Find/FindPlayerQuery';
import { UserId } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserId';

export class FindPlayerQueryGenerator {
  static create(userId: UserId): FindPlayerQuery {
    return new FindPlayerQuery({ userId: userId.toString() });
  }

  static random(): FindPlayerQuery {
    return this.create(UserIdGenerator.random());
  }
}
