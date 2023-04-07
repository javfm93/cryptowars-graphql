import { WorldRepository } from '@/contexts/cryptoWars/domain/WorldRepository'
import { gql } from '@/contexts/shared/domain/__generated__'
import { FC } from 'react'
import { OpenChatButton } from './OpenChatButton'
import { useWorldMap } from './useWorldMap'

type WorldMapTownsChatProps = {
  repository: WorldRepository
  id: string
  townId: string
}

export const WorldMapTownsChat: FC<WorldMapTownsChatProps> = ({ repository, id, townId }) => {
  const { result, isLoading, error } = useWorldMap(repository, id)
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      {result.towns.map(town => (
        <OpenChatButton
          key={town.id}
          sender={{ townId }}
          receiver={{ townId: town.id, playerId: town.playerId }}
        />
      ))}
    </>
  )
}

export const WorldMapTownsChatFragment = gql(/* GraphQL */ `
  fragment WorldMapTownsChatFragment on Town {
    id
    playerId
  }
`)
