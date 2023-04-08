import { WorldRepository } from '@/contexts/cryptoWars/worlds/domain/WorldRepository'
import { gql } from '@/contexts/shared/domain/__generated__'
import { Button } from '@mui/material'
import { FC } from 'react'
import { useWorldMap } from './useWorldMap'

type WorldMapTownsChatProps = {
  repository: WorldRepository
  id: string
  townId?: string
}

export const WorldMapTownsChat: FC<WorldMapTownsChatProps> = ({ repository, id, townId }) => {
  const { result, isLoading, error } = useWorldMap(repository, id)
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      {result.towns.map(town => (
        <Button
          key={town.id}
          onClick={async () => {
            // await createChat(town.playerId)
            // navigate(AppRoutes.chat)
            alert('Not implemented yet')
          }}
          disabled={townId === town.id}
        >
          Chat with {town.playerId}
        </Button>
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
