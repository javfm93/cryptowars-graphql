import { TownRepository } from '@/contexts/cryptoWars/domain/TownRepository'
import { handleQueryResult } from '@/contexts/shared/application/query'
import { PlayerTownQuery, UnexpectedError } from '@/contexts/shared/domain/__generated__/graphql'
import { useEffect, useState } from 'react'

export const usePlayerTown = (repository: TownRepository, id: string) => {
  const [result, setResult] = useState<PlayerTownQuery['GetPlayerTown']>()
  const [domainError, setError] = useState<UnexpectedError>()

  useEffect(() => {
    repository.getTown(id).then(result => {
      result.isSuccess() ? setResult(result.value) : setError(result.value)
    })
  }, [repository, id])

  return handleQueryResult(result, domainError)
}
