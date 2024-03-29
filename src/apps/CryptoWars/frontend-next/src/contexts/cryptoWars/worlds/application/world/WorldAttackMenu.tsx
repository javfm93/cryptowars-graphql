import { ArmyRepository } from '@/contexts/battlefield/armies/domain/ArmyRepository'
import { gql } from '@/contexts/shared/domain/__generated__'
import { Button, FormControl, Input, InputLabel } from '@mui/material'
import { FC, useState } from 'react'
import { useTownArmy } from '../../../../battlefield/armies/application/townArmy/useTownArmy'
import { WorldRepository } from '../../domain/WorldRepository'
import { useSendAttack } from './useSendAttack'
import { useWorldMap } from './useWorldMap'

type WorldAttackMenuProps = {
  repository: WorldRepository
  armyRepository: ArmyRepository
  id: string
  attackerTownId?: string
}

export const WorldAttackMenu: FC<WorldAttackMenuProps> = ({
  repository,
  armyRepository,
  id,
  attackerTownId
}) => {
  const { result, isLoading, error } = useWorldMap(repository, id)
  const armyRequest = useTownArmy(armyRepository, attackerTownId)
  const { sendAttack } = useSendAttack()
  const [basicSoldiers, setBasicSoldiers] = useState<number>(0)
  if (isLoading) return <div>Loading...</div>
  if (error || armyRequest.error) {
    return <div>Error: {error?.message ?? armyRequest.error?.message}</div>
  }
  const army = armyRequest.result
  const worldTowns = result.towns

  const onAttack = (townId: string) => {
    if (army) {
      sendAttack({
        attackerArmy: army.id,
        defenderTown: townId,
        soldiers: { basic: basicSoldiers, range: 0 }
      })
    }
  }
  return (
    <>
      <FormControl variant="standard">
        <InputLabel htmlFor="basic">Basic: Max {army?.squads.basic}</InputLabel>
        <Input
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onChange={value => setBasicSoldiers(parseInt(value.target.value))}
          defaultValue={basicSoldiers}
          id={'basic'}
        />
      </FormControl>

      {worldTowns.map(town => (
        <Button
          key={town.id}
          onClick={() => onAttack(town.id)}
          disabled={attackerTownId === town.id}
        >
          Attack {town.id} of {town.playerId}
        </Button>
      ))}
    </>
  )
}

export const WorldAttackMenuFragment = gql(/* GraphQL */ `
  fragment WorldAttackMenu on Town {
    id
    playerId
  }
`)
