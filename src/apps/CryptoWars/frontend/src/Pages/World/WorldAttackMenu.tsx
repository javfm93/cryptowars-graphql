import { useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSendAttack } from './useSendAttack';
import { useUrlQueryParams } from './useUrlQueryParams';
import { Primitives } from '../../../../../../Contexts/Shared/Domain/Primitives';
import { Army } from '../../../../../../Contexts/Battlefield/Armies/Domain/Army';
import { WorldTownsPrimitives } from '../../../../../../Contexts/CryptoWars/Worlds/Domain/World';

export const WorldAttackMenu = ({
  attackerTownId,
  army,
  worldTowns
}: {
  attackerTownId: string;
  army: Primitives<Army>;
  worldTowns: WorldTownsPrimitives;
}) => {
  const { id } = useParams();
  const townId = useUrlQueryParams('townId');
  if (!id || !townId) return <> Invalid world or town </>;
  const { sendAttack } = useSendAttack();
  const [basicSoldiers, setBasicSoldiers] = useState<number>(0);

  return (
    <>
      <FormControl variant="standard">
        <InputLabel htmlFor="basic">Basic: Max {army.squads[0].soldiers}</InputLabel>
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
            soldiers: { basic: basicSoldiers }
          })}
          disabled={attackerTownId === town.id}
        >
          Attack {town.id} of {town.playerId}
        </Button>
      ))}
    </>
  );
};
