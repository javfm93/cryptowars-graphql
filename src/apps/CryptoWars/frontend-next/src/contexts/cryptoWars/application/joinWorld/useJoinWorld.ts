import { handleMutationResult } from '@/contexts/shared/application/mutation'
import { AppRoutes } from '@/contexts/shared/infrastructure/routes'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  JoinWorldErrors,
  UnexpectedError
} from '../../../../../../../../../tests/apps/CryptoWars/backend/__generated__/graphql'
import { WorldRepository } from '../../domain/WorldRepository'

export const useJoinWorld = (repository: WorldRepository) => {
  const navigateTo = useRouter()
  const [domainError, setError] = useState<JoinWorldErrors | UnexpectedError>()
  const [executing, setExecuting] = useState(false)
  const [called, setCalled] = useState(false)

  const execute = async (id: string): Promise<void> => {
    const promise = repository.joinWorld(id)
    setExecuting(true)
    const result = await promise
    result.isSuccess() ? navigateTo.push(AppRoutes.home) : setError(result.value)
    setExecuting(false)
    setCalled(true)
  }

  return handleMutationResult(execute, executing, called, domainError)
}
