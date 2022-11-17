import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { AppRoutes } from '../../App';
import { usePlayer } from './usePlayer';
import TownHeader from './TownHeader';

type BuildingRow = { name: string; url: string; upgradeCost: number };
//todo: study react new ways to handle loadings (react router, suspense...)

export const TownPage = (): JSX.Element => {
  const { id } = useParams();
  if (!id) return <></>;
  const { result } = usePlayer();
  if (!result) return <></>;

  const buildings = result.player.towns[0].buildings;

  const buildingRows: Array<BuildingRow> = [
    { name: 'Town hall', url: AppRoutes.town(id), upgradeCost: 30 },
    {
      name: 'HeadQuarter',
      url: AppRoutes.headquarter(id),
      upgradeCost: buildings.headquarter.essenceRequiredToLevelUp
    },
    {
      name: 'Essence generator',
      url: '/',
      upgradeCost: buildings.essenceGenerator.essenceRequiredToLevelUp
    }
  ];

  return (
    <div>
      <TownHeader />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Buildings</TableCell>
              <TableCell align="right">Cost to upgrade</TableCell>
              <TableCell align="right">Build</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buildingRows.map(building => (
              <TableRow
                key={building.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link to={building.url}>{building.name}</Link>
                </TableCell>
                <TableCell align="right">{building.upgradeCost}</TableCell>
                <TableCell align="right">
                  <Button>upgrade</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
