import { Towns } from '@/contexts/cryptoWars/application/towns/towns'
import { TownRepository } from '@/contexts/cryptoWars/domain/TownRepository'
import { container } from '@/contexts/shared/infrastructure/container'

const repository = container.get(TownRepository)

export default function HomePage() {
  return <Towns repository={repository} />
}
