import { TownRepository } from '@/contexts/cryptoWars/towns/domain/TownRepository'
import { handleMutationResult } from '@/contexts/shared/application/mutation'
import {
  TownSoldiers,
  TrainSoldiersErrors,
  UnexpectedError
} from '@/contexts/shared/domain/__generated__/graphql'
import { useState } from 'react'

export const useTrainSoldiers = (repository: TownRepository, townId: string) => {
  const [domainError, setError] = useState<TrainSoldiersErrors | UnexpectedError>()
  const [executing, setExecuting] = useState(false)
  const [called, setCalled] = useState(false)

  const execute = async (soldiers: TownSoldiers): Promise<void> => {
    const promise = repository.trainSoldiers(townId, soldiers)
    setExecuting(true)
    const result = await promise
    if (result.isFailure()) setError(result.value)
    setExecuting(false)
    setCalled(true)
  }

  return handleMutationResult(execute, executing, called, domainError)
}
