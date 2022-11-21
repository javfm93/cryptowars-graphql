import { UserIdGenerator } from '../../../IAM/Users/Domain/UserIdGenerator';
import { FindPlayerQuery } from '../../../../../src/Contexts/CryptoWars/Players/Application/Find/FindPlayerQuery';
import { UserId } from '../../../../../src/Contexts/IAM/Users/Domain/UserId';

export class FindPlayerQueryGenerator {
  static create(userId: UserId, retrieveRelations: boolean): FindPlayerQuery {
    return new FindPlayerQuery({ userId: userId.toString(), retrieveRelations });
  }

  static random(): FindPlayerQuery {
    return this.create(UserIdGenerator.random(), true);
  }
}
