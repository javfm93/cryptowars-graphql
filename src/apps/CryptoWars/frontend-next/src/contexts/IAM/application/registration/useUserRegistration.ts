import { handleMutationResult } from '@/contexts/shared/application/mutation'
import { CreateUserErrors, UnexpectedError } from '@/contexts/shared/domain/__generated__/graphql'
import { AppRoutes } from '@/contexts/shared/infrastructure/routes'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { UserRepository } from '../../domain/userRepository'

export const useUserRegistration = (repository: UserRepository) => {
  const navigateTo = useRouter()
  const [domainError, setError] = useState<CreateUserErrors | UnexpectedError>()
  const [executing, setExecuting] = useState(false)
  const [called, setCalled] = useState(false)

  const execute = async (email: string, password: string): Promise<void> => {
    const promise = repository.register(email, password)
    setExecuting(true)
    const result = await promise
    result.isSuccess() ? navigateTo.push(AppRoutes.home) : setError(result.value)
    setExecuting(false)
    setCalled(true)
  }

  return handleMutationResult(execute, executing, called, domainError)
}
