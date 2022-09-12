import { UuidGenerator } from '../../../Shared/Domain/UuidGenerator';
import { FindWorldQuery } from '../../../../../src/Contexts/CryptoWars/Worlds/Application/Find/FindWorldQuery';

export class FindWorldQueryGenerator {
  static create(id: string): FindWorldQuery {
    return new FindWorldQuery({ id });
  }

  static random(): FindWorldQuery {
    return this.create(UuidGenerator.random().toString());
  }
}
