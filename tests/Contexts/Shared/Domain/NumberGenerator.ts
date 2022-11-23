import * as faker from 'faker';

export class NumberGenerator {
  static randomBetween1and9 = () => faker.datatype.number({ min: 1, max: 9 });
  static randomBetween10and90 = () => faker.datatype.number({ min: 10, max: 90 });
}
