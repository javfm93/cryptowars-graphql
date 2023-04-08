import { TownRepository } from '@/contexts/cryptoWars/towns/domain/TownRepository'
import { handleQueryResult } from '@/contexts/shared/application/query'
import {
  PlayerTownHeadQuarterQuery,
  UnexpectedError
} from '@/contexts/shared/domain/__generated__/graphql'
import { useEffect, useState } from 'react'

type Result = PlayerTownHeadQuarterQuery['GetPlayerTown']['buildings']['headquarter']

export const usePlayerTownHeadquarter = (repository: TownRepository, id: string) => {
  const [result, setResult] = useState<Result>()
  const [domainError, setError] = useState<UnexpectedError>()

  useEffect(() => {
    repository.getPlayerTownHeadquarter(id).then(result => {
      result.isSuccess() ? setResult(result.value.buildings.headquarter) : setError(result.value)
    })
  }, [repository, id])

  return handleQueryResult(result, domainError)
}
