import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Input } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TrainSoldiersPostRequest } from '../../../../backend/Controllers/Towns/TrainSoldiersPostRequest';
import { TownSoldier } from '../../../../../../Contexts/CryptoWars/Towns/Domain/TownSoldiers';
import { SquadsPrimitives } from '../../../../../../Contexts/Battlefield/Armies/Domain/Squads';

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
  const [basicSoldiersToTrain, setBasicSoldiersToTrain] = useState<number>(0);

  const trainSoldiers = () =>
    onTrainSoldiers({
      soldiers: { basic: basicSoldiersToTrain }
    });
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('town.buildings.headquarter.unitType')}</TableCell>
              <TableCell align="right">{t('town.buildings.headquarter.unitCost')}</TableCell>
              <TableCell align="right">{t('town.buildings.headquarter.attack')}</TableCell>
              <TableCell align="right">{t('town.buildings.headquarter.defense')}</TableCell>
              <TableCell align="right">{t('town.buildings.headquarter.recruited')}</TableCell>
              <TableCell align="right">{t('town.buildings.headquarter.train')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            /* Object.values(townsUnit) // townArmySquads[townUnit.type] */
            {townUnits.map(unit => {
              const squad = townArmySquads.find(s => s.type.toString() === unit.name.toString());

              return (
                <TableRow
                  key={unit.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {unit.name}
                  </TableCell>
                  <TableCell align="right">{unit.cost}</TableCell>
                  <TableCell align="right">{unit.attack}</TableCell>
                  <TableCell align="right">{unit.defense}</TableCell>
                  <TableCell align="right">{squad?.soldiers ?? 0}</TableCell>
                  <TableCell align="right">
                    <Input
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      onChange={value => setBasicSoldiersToTrain(parseInt(value.target.value))}
                      defaultValue={basicSoldiersToTrain}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="outlined" onClick={trainSoldiers}>
        {t('town.buildings.headquarter.train')}
      </Button>
    </>
  );
};
