import { World } from '@/contexts/cryptoWars/application/worlds/World'
import { WorldRepository } from '@/contexts/cryptoWars/domain/WorldRepository'
import { container } from '@/contexts/shared/infrastructure/container'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const repository = container.get(WorldRepository)

const WorldPage: NextPage = () => {
  const router = useRouter()
  const { id, townId } = router.query
  if (typeof id !== 'string') return <p>Not valid id</p>
  if (typeof townId !== 'string') return <p>Not town id</p>

  return <World repository={repository} id={id} townId={townId} />
}

export default WorldPage
