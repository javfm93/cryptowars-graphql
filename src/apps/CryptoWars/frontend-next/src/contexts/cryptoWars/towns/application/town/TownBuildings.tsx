import { FragmentType, gql, useFragment } from '@/contexts/shared/domain/__generated__'
import { AppRoutes } from '@/contexts/shared/infrastructure/routes'
import { Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Link from 'next/link'
import { FC } from 'react'

type BuildingRow = { name: string; url: string; upgradeCost: number }

type TownBuildingsProps = {
  id: string
  townBuildings: FragmentType<typeof playerTownBuildingsFragment>
}

export const TownBuildings: FC<TownBuildingsProps> = ({ id, townBuildings }) => {
  const buildings = useFragment(playerTownBuildingsFragment, townBuildings)

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
  ]

  return (
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
                <Link href={building.url}>{building.name}</Link>
              </TableCell>
              <TableCell align="right">{building.upgradeCost}</TableCell>
              <TableCell align="right">
                <Button>Upgrade</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const playerTownBuildingsFragment = gql(/* GraphQL */ `
  fragment PlayerTownBuildings on TownBuildings {
    headquarter {
      level
      essenceRequiredToLevelUp
    }
    essenceGenerator {
      level
      essenceRequiredToLevelUp
    }
    warehouse {
      level
      essenceRequiredToLevelUp
    }
  }
`)
