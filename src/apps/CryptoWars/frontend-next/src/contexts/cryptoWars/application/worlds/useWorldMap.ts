import { handleQueryResult } from '@/contexts/shared/application/query'
import { UnexpectedError, WorldMapQuery } from '@/contexts/shared/domain/__generated__/graphql'
import { useEffect, useState } from 'react'
import { WorldRepository } from '../../domain/WorldRepository'

export const useWorldMap = (repository: WorldRepository, id: string) => {
  const [result, setResult] = useState<WorldMapQuery['GetWorldMap']>()
  const [domainError, setError] = useState<UnexpectedError>()

  useEffect(() => {
    repository.getWorldMap(id).then(result => {
      result.isSuccess() ? setResult(result.value) : setError(result.value)
    })
  }, [repository, id])

  return handleQueryResult(result, domainError)
}
