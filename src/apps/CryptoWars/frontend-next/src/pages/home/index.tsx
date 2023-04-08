import { Towns } from '@/contexts/cryptoWars/towns/application/towns/towns'
import { TownRepository } from '@/contexts/cryptoWars/towns/domain/TownRepository'
import { container } from '@/contexts/shared/infrastructure/container'

const repository = container.get(TownRepository)

export default function HomePage() {
  return <Towns repository={repository} />
}
