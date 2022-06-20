import { UuidGenerator } from '../../../Shared/Domain/UuidGenerator';
import { FindUserQuery } from '../../../../../src/Contexts/CryptoWars/Users/Application/Find/FindUserQuery';

export class FindUserQueryGenerator {
  static create(id: string): FindUserQuery {
    return new FindUserQuery({ id });
  }

  static random(): FindUserQuery {
    return this.create(UuidGenerator.random().toString());
  }
}
