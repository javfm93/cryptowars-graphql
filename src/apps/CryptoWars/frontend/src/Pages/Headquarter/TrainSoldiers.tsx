import { ChangeEvent, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Input } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SquadsPrimitives } from '../../../../../../Contexts/Battlefield/Armies/Domain/Squads';
import {
  FragmentType,
  gql,
  useFragment
} from '../../../../../../../tests/apps/CryptoWars/backend/__generated__';
import {
  TownSoldiers,
  TownSoldierTypes
} from '../../../../../../../tests/apps/CryptoWars/backend/__generated__/graphql';

const townSoldierFragment = gql(/* GraphQL */ `
  fragment TownSoldier on TownSoldier {
    name
    speed
    capacity
    time
    cost
  }
`);

type TrainSoldiersProps = {
  townUnits: Array<FragmentType<typeof townSoldierFragment>>;
  townArmySquads: SquadsPrimitives;

  onTrainSoldiers(soldiers: TownSoldiers): Promise<void>;
};

export const TrainSoldiers = (props: TrainSoldiersProps): JSX.Element => {
  const { t } = useTranslation();
  const townUnits = useFragment(townSoldierFragment, props.townUnits);
  const [soldiersToTrain, setSoldiersToTrain] = useState<TownSoldiers>({
    basic: 0,
    range: 0
  });

  const trainSoldiers = () => props.onTrainSoldiers(soldiersToTrain);

  const onChange =
    (unit: TownSoldierTypes) => (value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setSoldiersToTrain(previous => ({ ...previous, [unit]: parseInt(value.target.value) }));
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('town.buildings.headquarter.unitType')}</TableCell>
              <TableCell align="right">{t('town.buildings.headquarter.unitCost')}</TableCell>
              <TableCell align="right">{t('town.buildings.headquarter.speed')}</TableCell>
              <TableCell align="right">{t('town.buildings.headquarter.capacity')}</TableCell>
              <TableCell align="right">{t('town.buildings.headquarter.time')}</TableCell>
              <TableCell align="right">{t('town.buildings.headquarter.recruited')}</TableCell>
              <TableCell align="right">{t('town.buildings.headquarter.train')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {townUnits.map(unit => (
              <TableRow key={unit.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {unit.name}
                </TableCell>
                <TableCell align="right">{unit.cost}</TableCell>
                <TableCell align="right">{unit.speed}</TableCell>
                <TableCell align="right">{unit.capacity}</TableCell>
                <TableCell align="right">{unit.time}</TableCell>
                <TableCell align="right">
                  {unit.name === 'basic' ? props.townArmySquads[unit.name] : 0}
                </TableCell>
                <TableCell align="right">
                  <Input
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={onChange(unit.name)}
                    defaultValue={soldiersToTrain[unit.name]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="outlined" onClick={trainSoldiers}>
        {t('town.buildings.headquarter.train')}
      </Button>
    </>
  );
};
