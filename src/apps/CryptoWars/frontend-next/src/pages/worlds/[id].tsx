import { ArmyRepository } from '@/contexts/battlefield/armies/domain/ArmyRepository'
import { World } from '@/contexts/cryptoWars/worlds/application/world/World'
import { WorldRepository } from '@/contexts/cryptoWars/worlds/domain/WorldRepository'
import { container } from '@/contexts/shared/infrastructure/container'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'

const repository = container.get(WorldRepository)
const armyRepository = container.get(ArmyRepository)

const WorldPage = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { townId } = router.query
  if (typeof townId === 'object') throw new Error('Not valid townId')

  return <World repository={repository} armyRepository={armyRepository} id={id} townId={townId} />
}
export default WorldPage

export const getStaticProps: GetStaticProps<{ id: string }> = async context => {
  const id = context.params?.id
  if (typeof id !== 'string') throw new Error('Not valid id')
  return {
    props: { id }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await repository.getWorlds()
  if (result.isFailure()) throw new Error(result.value.message)

  const paths = result.value.worlds.map(world => ({
    params: { id: world.id }
  }))
  return {
    paths,
    fallback: false
  }
}
