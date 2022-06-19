import { ListWorldsQuery } from '../../../../../src/Contexts/CryptoWars/Worlds/Application/List/ListWorldsQuery';

export class ListWorldsQueryGenerator {
  static create(): ListWorldsQuery {
    return new ListWorldsQuery();
  }

  static random(): ListWorldsQuery {
    return this.create();
  }
}
