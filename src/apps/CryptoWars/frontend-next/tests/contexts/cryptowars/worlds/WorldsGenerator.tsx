import { PrimitivesGenerator } from '../../shared/primitivesGenerator'

export class WorldsGenerator {
  static multipleRandom() {
    return PrimitivesGenerator.randomArrayOf(this.random)
  }

  static random() {
    return {
      id: PrimitivesGenerator.randomUuid(),
      name: PrimitivesGenerator.randomUserName()
    }
  }
}
