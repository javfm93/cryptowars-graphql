import { ArmyRepository } from '@/contexts/battlefield/armies/domain/ArmyRepository'
import { BattleRepository } from '@/contexts/battlefield/battles/domain/BattleRepository'
import { TownHeadquarter } from '@/contexts/cryptoWars/towns/application/townHeadquarter/TownHeadquarter'
import { TownRepository } from '@/contexts/cryptoWars/towns/domain/TownRepository'
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
