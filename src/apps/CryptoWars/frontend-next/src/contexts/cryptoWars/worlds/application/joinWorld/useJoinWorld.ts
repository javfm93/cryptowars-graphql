import { useCommand } from '@/contexts/shared/application/mutation'
import { AppRoutes } from '@/contexts/shared/infrastructure/routes'
import { useRouter } from 'next/router'
import { JoinWorldErrors } from '../../../../../../../../../../tests/apps/CryptoWars/backend/__generated__/graphql'
import { WorldRepository } from '../../domain/WorldRepository'

export const useJoinWorld = (repository: WorldRepository) => {
  const navigateTo = useRouter()
  const { executeCommand, command } = useCommand<JoinWorldErrors>()

  const execute = async (id: string): Promise<void> => {
    await executeCommand({
      onSuccess: () => navigateTo.push(AppRoutes.home),
      toExecute: () => repository.joinWorld(id)
    })
  }

  return { execute, ...command }
}
