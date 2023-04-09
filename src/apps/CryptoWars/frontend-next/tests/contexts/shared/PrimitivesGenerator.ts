import { faker } from '@faker-js/faker'

export class PrimitivesGenerator {
  static randomArrayOf<T>(generator: () => T, length = this.randomPositiveInteger()): T[] {
    return Array.from({ length }, generator)
  }

  static randomUuid(): string {
    return faker.datatype.uuid()
  }

  static randomPositiveInteger(): number {
    return faker.datatype.number({ min: 1, max: 10 })
  }

  static randomRecentDate(): Date {
    return faker.date.recent()
  }

  static randomUserName(): string {
    return faker.internet.userName()
  }
}
