import { FC } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../App';
import {
  FragmentType,
  gql,
  useFragment
} from '../../../../../../../tests/apps/CryptoWars/backend/__generated__';

interface TownsProps {
  towns: Array<FragmentType<typeof playerTownsFragment>>;
}

export const Towns: FC<TownsProps> = props => {
  const towns = useFragment(playerTownsFragment, props.towns);

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
                <Link to={AppRoutes.town(town.id)}>{`Town Number ${index + 1}`}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const playerTownsFragment = gql(/* GraphQL */ `
  fragment PlayerTowns on Town {
    id
  }
`);
