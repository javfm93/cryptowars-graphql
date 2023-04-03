import { PlayerTownsFragment } from '@/contexts/shared/domain/__generated__/graphql';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { FC } from 'react';
import { gql } from '../../../../../../../../../tests/apps/CryptoWars/backend/__generated__';
import { AppRoutes } from '../../../../pages';

interface TownsProps {
  towns: readonly PlayerTownsFragment[];
}

export const Towns: FC<TownsProps> = ({ towns }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {towns.map((town, index) => (
            <TableRow key={town.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Link href={AppRoutes.town(town.id)}>{`Town Number ${index + 1}`}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const playerTownsFragment = gql(/* GraphQL */ `
  fragment PlayerTowns on Town {
    id
  }
`);
