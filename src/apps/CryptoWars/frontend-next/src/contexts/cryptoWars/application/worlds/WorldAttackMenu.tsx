import { ArmyRepository } from '@/contexts/battlefield/domain/ArmyRepository'
import { gql } from '@/contexts/shared/domain/__generated__'
import { Button, FormControl, Input, InputLabel } from '@mui/material'
import { FC, useState } from 'react'
import { WorldRepository } from '../../domain/WorldRepository'
import { useSendAttack } from './useSendAttack'
import { useTownArmy } from './useTownArmy'
import { useWorldMap } from './useWorldMap'

type WorldAttackMenuProps = {
  repository: WorldRepository
  armyRepository: ArmyRepository
  id: string
  attackerTownId: string
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
  if (isLoading || armyRequest.isLoading) return <div>Loading...</div>
  if (error || armyRequest.error) {
    return <div>Error: {error?.message ?? armyRequest.error?.message}</div>
  }
  const army = armyRequest.result
  const worldTowns = result.towns

  return (
    <>
      <FormControl variant="standard">
        <InputLabel htmlFor="basic">Basic: Max {army.squads.basic}</InputLabel>
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
          onClick={sendAttack({
            attackerArmy: army.id,
            defenderTown: town.id,
            soldiers: { basic: basicSoldiers, range: 0 }
          })}
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
