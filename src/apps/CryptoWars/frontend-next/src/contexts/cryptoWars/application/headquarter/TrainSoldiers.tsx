import { ArmyRepository } from '@/contexts/battlefield/domain/ArmyRepository'
import { useTownArmy } from '@/contexts/cryptoWars/application/worlds/useTownArmy'
import { TownRepository } from '@/contexts/cryptoWars/domain/TownRepository'
import { TownSoldierTypes, TownSoldiers } from '@/contexts/shared/domain/__generated__/graphql'
import { Button, Input } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { ChangeEvent, FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePlayerTownHeadquarter } from './usePlayerTownHeadQuarter'
import { useTrainSoldiers } from './useTrainSoldiers'

type TrainSoldiersProps = {
  repository: TownRepository
  armyRepository: ArmyRepository
  townId: string
}

export const TrainSoldiers: FC<TrainSoldiersProps> = ({ repository, armyRepository, townId }) => {
  const { t } = useTranslation()
  const { execute } = useTrainSoldiers(repository, townId)
  const { result: army, error } = useTownArmy(armyRepository, townId)
  const { result: headquarter, error: headquarterError } = usePlayerTownHeadquarter(
    repository,
    townId
  )
  const [soldiersToTrain, setSoldiersToTrain] = useState<TownSoldiers>({
    basic: 0,
    range: 0
  })
  if (!headquarter) return <p> Loading Your Army...</p>
  if (error || headquarterError) return <p> (error ?? headquarterError)</p>
  const townUnits = headquarter.units
  const onChange =
    (unit: TownSoldierTypes) => (value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setSoldiersToTrain(previous => ({ ...previous, [unit]: parseInt(value.target.value) }))
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
                  {unit.name === 'basic' ? army?.squads[unit.name] : 0}
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
      <Button variant="outlined" onClick={() => execute(soldiersToTrain)}>
        {t('town.buildings.headquarter.train')}
      </Button>
    </>
  )
}
