import { useCommand } from '@/contexts/shared/application/mutation'
import { LoginErrors } from '@/contexts/shared/domain/__generated__/graphql'
import { AppRoutes } from '@/contexts/shared/infrastructure/routes'
import { useRouter } from 'next/router'
import { UserRepository } from '../../domain/userRepository'

export const useUserLogin = (repository: UserRepository) => {
  const navigateTo = useRouter()
  const { executeCommand, command } = useCommand<LoginErrors>()

  const execute = async (email: string, password: string): Promise<void> => {
    await executeCommand({
      onSuccess: () => navigateTo.push(AppRoutes.home),
      toExecute: () => repository.login(email, password)
    })
  }

  return { execute, ...command }
}
