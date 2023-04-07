import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import {
  FragmentType,
  gql,
  useFragment
} from '../../../../../../../tests/apps/CryptoWars/backend/__generated__';

type BattleHistoryProps = {
  battles: Array<FragmentType<typeof battlesHistoryFragment>>;
};

export const BattleHistory = (props: BattleHistoryProps): JSX.Element => {
  const battles = useFragment(battlesHistoryFragment, props.battles);
  const { t } = useTranslation();
  return (
    <>
      <h3>{t('town.battles.tittle')}</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('town.battles.winner')}</TableCell>
              <TableCell align="right">{t('town.battles.defender')}</TableCell>
              <TableCell align="right">{t('town.battles.attackedWith')}</TableCell>
              <TableCell align="right">{t('town.battles.casualties')}</TableCell>
              <TableCell align="right">{t('town.battles.returning')}</TableCell>
              <TableCell align="right">{t('town.battles.sentAt')}</TableCell>
              <TableCell align="right">{t('town.battles.finishedAt')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {battles.map(battle => (
              <TableRow key={battle.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {battle.result.winner.toString()}
                </TableCell>
                <TableCell align="right">{battle.defenderArmy.townId}</TableCell>
                <TableCell align="right">{`basic: ${battle.attack.attackerTroop.squads.basic}`}</TableCell>
                <TableCell align="right">{`basic: ${battle.result.attackerCasualties.basic}`}</TableCell>
                <TableCell align="right">{`basic: ${battle.result.returningTroop.squads.basic}`}</TableCell>
                <TableCell align="right">
                  {new Date(battle.attack.sentAt.toString()).toUTCString()}
                </TableCell>
                <TableCell align="right">
                  {new Date(battle.finishedAt.toString()).toUTCString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const battlesHistoryFragment = gql(/* GraphQL */ `
  fragment Battle on Battle {
    id
    finishedAt
    defenderArmy {
      townId
    }
    attack {
      sentAt
      attackerTroop {
        squads {
          basic
        }
      }
    }
    result {
      winner
      attackerCasualties {
        basic
        range
      }
      defenderCasualties {
        basic
        range
      }
      returningTroop {
        armyId
        squads {
          basic
          range
        }
      }
    }
  }
`);
