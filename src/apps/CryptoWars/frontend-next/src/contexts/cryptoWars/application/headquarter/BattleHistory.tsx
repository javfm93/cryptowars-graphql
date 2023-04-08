import { BattleRepository } from '@/contexts/battlefield/domain/BattleRepository'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useBattles } from './useBattles'

type BattleHistoryProps = {
  repository: BattleRepository
  armyId: string
}

export const BattleHistory: FC<BattleHistoryProps> = ({ repository, armyId }) => {
  const { result, isLoading, error } = useBattles(repository, armyId)
  const { t } = useTranslation()
  if (isLoading) return <p> Loading battle results...</p>
  if (error) return <p> {error.message}</p>
  const battles = result.battles

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
  )
}
