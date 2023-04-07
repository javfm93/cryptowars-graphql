import { ArmyRepository } from '@/contexts/battlefield/domain/ArmyRepository'
import { WorldRepository } from '@/contexts/cryptoWars/domain/WorldRepository'
import { Layout } from '@/contexts/shared/application/Layout'
import { FC } from 'react'
import { WorldAttackMenu } from './WorldAttackMenu'
import { WorldMap } from './WorldMap'
import { WorldMapTownsChat } from './WorldMapTownsChat'

type WorldPageProps = {
  repository: WorldRepository
  armyRepository: ArmyRepository
  id: string
  townId: string
}

export const World: FC<WorldPageProps> = ({ repository, armyRepository, id, townId }) => {
  return (
    <Layout tittle={'World Map'}>
      <>
        <WorldMapTownsChat repository={repository} id={id} townId={townId} />
        <br />
        <WorldAttackMenu
          repository={repository}
          armyRepository={armyRepository}
          id={id}
          attackerTownId={townId}
        />
        <WorldMap />
      </>
    </Layout>
  )
}
