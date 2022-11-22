import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { usePlayer } from './usePlayer';
import { Link, useParams } from 'react-router-dom';
import { styled } from '@mui/material';
import { TownPrimitives } from '../../../../../../Contexts/CryptoWars/Towns/Domain/Town';
import { AppRoutes } from '../../App';

const HeaderWrapper = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.grey.A700
}));

const calculateCurrentAssetValue = (
  initial: number,
  generationPerHour: number,
  hoursToUpdate: number
): number => parseFloat((initial + generationPerHour * hoursToUpdate).toFixed(0));

const fromMsToHours = (ms: number): number => {
  const sec = ms / 1000;
  return sec / 3600;
};

const calculateMsSince = (date: Date) => Math.abs(new Date().valueOf() - date.valueOf());

const calculateInitialEssenceOf = (town: TownPrimitives): number => {
  const { generationPerHour } = town.buildings.essenceGenerator;
  const essenceWarehouse = town?.buildings.warehouse.assets.essence;
  const lastEssenceRegistry = essenceWarehouse?.stored ?? 0;
  const lastEssenceUpdate = essenceWarehouse?.lastStorageUpdate ?? new Date();

  return calculateCurrentAssetValue(
    lastEssenceRegistry,
    generationPerHour,
    fromMsToHours(calculateMsSince(new Date(lastEssenceUpdate)))
  );
};

const msToRecalculateEssence = 1000;

export default function TownHeader() {
  const { result } = usePlayer();
  const { id } = useParams();
  const [essence, setEssence] = useState<number>(0);
  if (!result) return <></>;

  useEffect(() => {
    if (result) {
      const town = result.player.towns.find(to => to.id === id);

      if (town) {
        const { generationPerHour } = town.buildings.essenceGenerator;
        setEssence(calculateInitialEssenceOf(town));
        const updateEssence = () => {
          setEssence(ess =>
            calculateCurrentAssetValue(
              ess,
              generationPerHour,
              fromMsToHours(msToRecalculateEssence)
            )
          );
        };
        setInterval(updateEssence, msToRecalculateEssence);
      }
    }
  }, [result]);

  const worldRoute = `${AppRoutes.world(result.player.worlds[0].id)}?townId=${id}`;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <HeaderWrapper position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Essence: {essence}
          </Typography>
          <Link to={worldRoute}>World Map</Link>
        </Toolbar>
      </HeaderWrapper>
    </Box>
  );
}
