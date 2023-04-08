import { ArmyRepository } from '@/contexts/battlefield/domain/ArmyRepository'
import { BattleRepository } from '@/contexts/battlefield/domain/BattleRepository'
import { TownHeader } from '@/contexts/cryptoWars/application/towns/townHeader/TownHeader'
import { useTownArmy } from '@/contexts/cryptoWars/application/worlds/useTownArmy'
import { TownRepository } from '@/contexts/cryptoWars/domain/TownRepository'
import { FC } from 'react'
import { BattleHistory } from './BattleHistory'
import { TrainSoldiers } from './TrainSoldiers'

type TownHeadquarterPageProps = {
  repository: TownRepository
  armyRepository: ArmyRepository
  battleRepository: BattleRepository
  townId: string
}

export const TownHeadquarter: FC<TownHeadquarterPageProps> = ({
  repository,
  armyRepository,
  battleRepository,
  townId
}) => {
  const { result } = useTownArmy(armyRepository, townId)

  return (
    <div>
      <TownHeader repository={repository} id={townId} />
      <TrainSoldiers repository={repository} armyRepository={armyRepository} townId={townId} />
      {result?.id && <BattleHistory repository={battleRepository} armyId={result.id} />}
    </div>
  )
}
