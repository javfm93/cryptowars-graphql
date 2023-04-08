import { Result } from '@/contexts/shared/application/result'
import { ArmyBattlesQuery, UnexpectedError } from '@/contexts/shared/domain/__generated__/graphql'

export abstract class BattleRepository {
  abstract getArmyBattles(
    armyId: string
  ): Promise<Result<ArmyBattlesQuery['GetBattles'], UnexpectedError>>
}
