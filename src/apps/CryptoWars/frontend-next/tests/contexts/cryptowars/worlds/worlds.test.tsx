import { Worlds } from '@/contexts/cryptoWars/worlds/application/joinWorld/Worlds'
import { WorldRepository } from '@/contexts/cryptoWars/worlds/domain/WorldRepository'
import { success, successAndReturn } from '@/contexts/shared/application/result'
import { AppRoutes } from '@/contexts/shared/infrastructure/routes'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'
import { WorldsGenerator } from './worldsGenerator'

const routerMock = {
  push: vi.fn()
}

vi.mock('next/router', () => ({
  useRouter: () => routerMock
}))

const repository = mock<WorldRepository>()

describe('Worlds', () => {
  it('Should show all the worlds', async () => {
    const worlds = WorldsGenerator.multipleRandom()
    repository.getWorlds.mockResolvedValueOnce(successAndReturn({ worlds }))

    render(<Worlds repository={repository} />)

    const assertions = worlds.map(world => {
      return screen.findByRole('button', { name: world.name })
    })
    await Promise.all(assertions)
  })

  it('Should join a world', async () => {
    const worlds = WorldsGenerator.multipleRandom()
    repository.getWorlds.mockResolvedValueOnce(successAndReturn({ worlds }))
    repository.joinWorld.mockResolvedValueOnce(success())

    render(<Worlds repository={repository} />)

    const button = await screen.findByRole('button', { name: worlds[0].name })
    await userEvent.click(button)
    expect(repository.joinWorld).toHaveBeenCalledWith(worlds[0].id)
    expect(routerMock.push).toHaveBeenCalledWith(AppRoutes.home)
  })
})
