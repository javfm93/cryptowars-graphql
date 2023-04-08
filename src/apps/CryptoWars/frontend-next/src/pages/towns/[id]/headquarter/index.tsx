import { ArmyRepository } from '@/contexts/battlefield/domain/ArmyRepository'
import { BattleRepository } from '@/contexts/battlefield/domain/BattleRepository'
import { TownHeadquarter } from '@/contexts/cryptoWars/application/headquarter/TownHeadquarter'
import { TownRepository } from '@/contexts/cryptoWars/domain/TownRepository'
import { container } from '@/contexts/shared/infrastructure/container'
import { useRouter } from 'next/router'

const repository = container.get(TownRepository)
const armyRepository = container.get(ArmyRepository)
const battleRepository = container.get(BattleRepository)

const HeadquarterPage = () => {
  const router = useRouter()
  const { id } = router.query

  if (typeof id !== 'string') return <p>Not valid id</p>
  return (
    <TownHeadquarter
      repository={repository}
      armyRepository={armyRepository}
      battleRepository={battleRepository}
      townId={id}
    />
  )
}

export default HeadquarterPage
