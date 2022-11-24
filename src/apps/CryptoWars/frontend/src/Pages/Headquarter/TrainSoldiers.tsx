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
import { TrainSoldiersPostRequest } from '../../../../backend/Controllers/CryptoWars/Towns/TrainSoldiersPostRequest';
import { SquadsPrimitives } from '../../../../../../Contexts/Battlefield/Armies/Domain/Squads';
import {
  TownSoldier,
  TownSoldierTypes
} from '../../../../../../Contexts/CryptoWars/Towns/Domain/TownSoldier';
import { TownSoldiersPrimitives } from '../../../../../../Contexts/CryptoWars/Towns/Domain/TownSoldiers';

interface TrainSoldiersProps {
  townUnits: Array<TownSoldier>;
  townArmySquads: SquadsPrimitives;

  onTrainSoldiers(soldiers: TrainSoldiersPostRequest): void;
}

export const TrainSoldiers = ({
  townUnits,
  onTrainSoldiers,
  townArmySquads
}: TrainSoldiersProps): JSX.Element => {
  const { t } = useTranslation();
  const [soldiersToTrain, setSoldiersToTrain] = useState<TownSoldiersPrimitives>({
    basic: 0,
    range: 0
  });

  const trainSoldiers = () =>
    onTrainSoldiers({
      soldiers: soldiersToTrain
    });

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
                  {unit.name === 'basic' ? townArmySquads[unit.name] : 0}
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
