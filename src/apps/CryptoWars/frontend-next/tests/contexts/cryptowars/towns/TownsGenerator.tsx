import { PlayerTownQuery } from '@/contexts/shared/domain/__generated__/graphql'
import { faker } from '@faker-js/faker'
import { PrimitivesGenerator } from '../../shared/primitivesGenerator'

export class TownsGenerator {
  static multipleRandom() {
    return PrimitivesGenerator.randomArrayOf(this.random)
  }

  static random() {
    return {
      id: PrimitivesGenerator.randomUuid()
    }
  }

  static randomWithBuildings() {
    return {
      id: PrimitivesGenerator.randomUuid(),
      buildings: {
        headquarter: {
          level: PrimitivesGenerator.randomPositiveInteger(),
          essenceRequiredToLevelUp: PrimitivesGenerator.randomPositiveInteger()
        },
        essenceGenerator: {
          level: PrimitivesGenerator.randomPositiveInteger(),
          essenceRequiredToLevelUp: PrimitivesGenerator.randomPositiveInteger()
        },
        warehouse: {
          level: PrimitivesGenerator.randomPositiveInteger(),
          essenceRequiredToLevelUp: PrimitivesGenerator.randomPositiveInteger()
        }
      }
    } as PlayerTownQuery['GetPlayerTown']
  }

  static randomHeaderFor(id = faker.datatype.uuid()) {
    return {
      id,
      worldId: PrimitivesGenerator.randomUuid(),
      buildings: {
        essenceGenerator: { generationPerHour: PrimitivesGenerator.randomPositiveInteger() },
        warehouse: {
          assets: {
            essence: {
              stored: PrimitivesGenerator.randomPositiveInteger(),
              lastStorageUpdate: PrimitivesGenerator.randomRecentDate().toISOString()
            }
          }
        }
      }
    }
  }
}
