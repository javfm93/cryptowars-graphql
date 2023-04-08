import { useTownArmy } from '@/contexts/battlefield/armies/application/townArmy/useTownArmy'
import { ArmyRepository } from '@/contexts/battlefield/armies/domain/ArmyRepository'
import { BattleRepository } from '@/contexts/battlefield/battles/domain/BattleRepository'
import { TownHeader } from '@/contexts/cryptoWars/towns/application/shared/townHeader/TownHeader'
import { TownRepository } from '@/contexts/cryptoWars/towns/domain/TownRepository'
import { FC } from 'react'
import { BattleHistory } from '../../../../battlefield/battles/application/battleHistory/BattleHistory'
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
