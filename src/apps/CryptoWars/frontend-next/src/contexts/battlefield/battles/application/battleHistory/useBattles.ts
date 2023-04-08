import { BattleRepository } from '@/contexts/battlefield/battles/domain/BattleRepository'
import { handleQueryResult } from '@/contexts/shared/application/query'
import { ArmyBattlesQuery, UnexpectedError } from '@/contexts/shared/domain/__generated__/graphql'
import { useEffect, useState } from 'react'

export const useBattles = (repository: BattleRepository, armyId: string) => {
  const [result, setResult] = useState<ArmyBattlesQuery['GetBattles']>()
  const [domainError, setError] = useState<UnexpectedError>()

  useEffect(() => {
    repository.getArmyBattles(armyId).then(result => {
      result.isSuccess() ? setResult(result.value) : setError(result.value)
    })
  }, [repository, armyId])

  return handleQueryResult(result, domainError)
}
