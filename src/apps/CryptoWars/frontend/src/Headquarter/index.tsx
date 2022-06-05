import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

type UnitRow = { name: string; trainCost: number };

export const HeadQuarter = () => {
  const unitRows: Array<UnitRow> = [{ name: 'Soldier', trainCost: 30 }];
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{t('town.headquarter.unitType')}</TableCell>
            <TableCell align="right">{t('town.headquarter.unitCost')}</TableCell>
            <TableCell align="right">{t('town.headquarter.train')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {unitRows.map(unit => (
            <TableRow key={unit.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {unit.name}
              </TableCell>
              <TableCell align="right">{unit.trainCost}</TableCell>
              <TableCell align="right">
                <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
