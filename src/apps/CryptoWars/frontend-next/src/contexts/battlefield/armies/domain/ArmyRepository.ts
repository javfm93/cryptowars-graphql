import { Result } from '@/contexts/shared/application/result'
import { GetArmyQuery, UnexpectedError } from '@/contexts/shared/domain/__generated__/graphql'

export abstract class ArmyRepository {
  abstract getTownArmy(townId: string): Promise<Result<GetArmyQuery['GetArmy'], UnexpectedError>>
}
