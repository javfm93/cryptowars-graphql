import { TownRepository } from '@/contexts/cryptoWars/towns/domain/TownRepository'
import { AppRoutes } from '@/contexts/shared/infrastructure/routes'
import { styled } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { PlayerTownHeader, usePlayerTownHeader } from './usePlayerTownHeader'

const HeaderWrapper = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.grey.A700
}))

const calculateCurrentAssetValue = (
  generationPerHour: number,
  initial: number,
  hoursToUpdate: number
): number => parseFloat((initial + generationPerHour * hoursToUpdate).toFixed(0))

const fromMsToHours = (ms: number): number => {
  const sec = ms / 1000
  return sec / 3600
}

const calculateMsSince = (date: Date) => Math.abs(new Date().valueOf() - date.valueOf())

const calculateInitialEssenceOf = (town: PlayerTownHeader): number => {
  const generationPerHour = town.buildings.essenceGenerator.generationPerHour
  const essenceWarehouse = town.buildings.warehouse.assets.essence
  const lastEssenceRegistry = essenceWarehouse.stored
  const lastEssenceUpdate = essenceWarehouse.lastStorageUpdate

  return calculateCurrentAssetValue(
    generationPerHour,
    lastEssenceRegistry,
    fromMsToHours(calculateMsSince(new Date(lastEssenceUpdate)))
  )
}

const msToRecalculateEssence = 1000

type TownHeaderProps = {
  repository: TownRepository
  id: string
}

export const TownHeader: FC<TownHeaderProps> = ({ repository, id }) => {
  const { result: town } = usePlayerTownHeader(repository, id)
  const [essence, setEssence] = useState<number>(0)
  useEffect(() => {
    if (town) {
      const { generationPerHour } = town.buildings.essenceGenerator
      setEssence(calculateInitialEssenceOf(town))
      const updateEssence = () => {
        setEssence(ess =>
          calculateCurrentAssetValue(ess, generationPerHour, fromMsToHours(msToRecalculateEssence))
        )
      }
      setInterval(updateEssence, msToRecalculateEssence)
    }
  }, [town])

  if (!town) return <></>
  const worldRoute = `${AppRoutes.world(town.worldId)}?townId=${id}`
  return (
    <Box sx={{ flexGrow: 1 }}>
      <HeaderWrapper position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Essence: {essence}
          </Typography>
          <Link href={worldRoute}>World Map</Link>
        </Toolbar>
      </HeaderWrapper>
    </Box>
  )
}
