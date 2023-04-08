import { FC } from 'react'
import { TownRepository } from '../../domain/TownRepository'
import { TownHeader } from '../shared/townHeader/TownHeader'
import { TownBuildings } from './TownBuildings'
import { usePlayerTown } from './usePlayerTown'

type TownProps = {
  repository: TownRepository
  id: string
}

export const Town: FC<TownProps> = ({ repository, id }) => {
  const { result, error, isLoading } = usePlayerTown(repository, id)
  if (isLoading) return <p>Loading</p>
  if (error) return <p>{error.message}</p>

  return (
    <>
      <TownHeader repository={repository} id={id} />
      <TownBuildings id={id} townBuildings={result.buildings} />
    </>
  )
}
