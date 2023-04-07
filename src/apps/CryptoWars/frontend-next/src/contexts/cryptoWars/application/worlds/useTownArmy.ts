import { ArmyRepository } from '@/contexts/battlefield/domain/ArmyRepository'
import { handleQueryResult } from '@/contexts/shared/application/query'
import { GetArmyQuery, UnexpectedError } from '@/contexts/shared/domain/__generated__/graphql'
import { useEffect, useState } from 'react'

export const useTownArmy = (repository: ArmyRepository, id: string) => {
  const [result, setResult] = useState<GetArmyQuery['GetArmy']>()
  const [domainError, setError] = useState<UnexpectedError>()

  useEffect(() => {
    repository.getTownArmy(id).then(result => {
      result.isSuccess() ? setResult(result.value) : setError(result.value)
    })
  }, [repository, id])

  return handleQueryResult(result, domainError)
}
