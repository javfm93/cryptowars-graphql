import { Button } from '@mui/material'
import { FC } from 'react'
import { WorldRepository } from '../../domain/WorldRepository'
import { useJoinWorld } from './useJoinWorld'
import { useWorlds } from './useWorlds'

type WorldsProps = { repository: WorldRepository }

export const Worlds: FC<WorldsProps> = ({ repository }) => {
  const { isLoading, error, result } = useWorlds(repository)
  const joinWorld = useJoinWorld(repository)
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error Loading Worlds: {error.message}</div>
  if (joinWorld.error) return <div>Error Joining World: {joinWorld.error.message}</div>
  const { worlds } = result

  return (
    <>
      {worlds.map(world => (
        <Button onClick={() => joinWorld.execute(world.id)} key={world.id}>
          {world.name}
        </Button>
      ))}
    </>
  )
}
