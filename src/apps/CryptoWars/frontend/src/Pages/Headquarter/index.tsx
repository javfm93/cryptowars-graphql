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
import { useTrainSoldiers } from './useTrainSoldiers';
import { useParams } from 'react-router-dom';
import { useTownArmy } from './useTownArmy';

export const Headquarter = (): JSX.Element => {
  const { t } = useTranslation();
  const { trainSoldiers } = useTrainSoldiers();
  const { id } = useParams();
  const [basicSoldiersToTrain, setBasicSoldiersToTrain] = useState<number>(0);

  if (!id) return <p> Not Valid Town Id</p>;
  const { result } = useTownArmy(id);
  if (!result || !result.army) return <p> Loading Your Army...</p>;
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('town.buildings.headquarter.unitType')}</TableCell>
              <TableCell align="right">{t('town.buildings.headquarter.unitCost')}</TableCell>
              <TableCell align="right">{t('town.buildings.headquarter.recruited')}</TableCell>
              <TableCell align="right">{t('town.buildings.headquarter.train')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.army.squads.map(squad => (
              <TableRow key={squad.type} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {squad.type}
                </TableCell>
                <TableCell align="right">30</TableCell>
                <TableCell align="right">{squad.soldiers}</TableCell>
                <TableCell align="right">
                  <Input
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={value => setBasicSoldiersToTrain(parseInt(value.target.value))}
                    defaultValue={basicSoldiersToTrain}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="outlined"
        onClick={trainSoldiers(id, {
          soldiers: { basic: basicSoldiersToTrain }
        })}
      >
        {t('town.buildings.headquarter.train')}
      </Button>
    </div>
  );
};
