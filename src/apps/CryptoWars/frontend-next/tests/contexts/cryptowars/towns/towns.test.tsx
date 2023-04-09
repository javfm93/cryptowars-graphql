import { Towns } from '@/contexts/cryptoWars/towns/application/towns/towns'
import { TownRepository } from '@/contexts/cryptoWars/towns/domain/TownRepository'
import { successAndReturn } from '@/contexts/shared/application/result'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { mock } from 'vitest-mock-extended'
import { TownsGenerator } from './townsGenerator'

const repository = mock<TownRepository>()

describe('Towns', () => {
  it('Should show all the towns of the player', async () => {
    const towns = TownsGenerator.multipleRandom()
    repository.getTowns.mockResolvedValueOnce(successAndReturn({ towns }))

    render(<Towns repository={repository} />)
    const townsLink = await screen.findAllByRole('link')
    expect(townsLink).toHaveLength(towns.length)
  })
})
