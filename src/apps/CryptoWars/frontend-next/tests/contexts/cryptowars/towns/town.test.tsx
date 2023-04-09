import { Town } from '@/contexts/cryptoWars/towns/application/town/town'
import { TownRepository } from '@/contexts/cryptoWars/towns/domain/TownRepository'
import { successAndReturn } from '@/contexts/shared/application/result'
import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { mock } from 'vitest-mock-extended'
import { TownsGenerator } from './townsGenerator'

const repository = mock<TownRepository>()

describe('Town', () => {
  it('Should show the town buildings of the player', async () => {
    const town = TownsGenerator.randomWithBuildings()
    const townHeader = TownsGenerator.randomHeaderFor(town.id)
    repository.getTown.mockResolvedValueOnce(successAndReturn(town))
    repository.getTownHeader.mockResolvedValueOnce(successAndReturn(townHeader))

    render(<Town repository={repository} id={town.id} />)
    await screen.findByRole('row', { name: /Town hall/ })
    await screen.findByRole('row', { name: /HeadQuarter/ })
    await screen.findByRole('row', { name: /Essence generator/ })
  })
})
