import * as React from 'react';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { usePlayer } from './usePlayer';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material';

const HeaderWrapper = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.grey.A700
}));

export default function TownHeader() {
  const { result } = usePlayer();
  const { id } = useParams();
  const [essence, setEssence] = useState<number>(0);

  useEffect(() => {
    const town = result?.player.towns.find(to => to.id === id);
    const generation = town?.buildings.essenceGenerator.generationPerHour;
    const e =
      town?.buildings.warehouse.assets.find(asset => asset.name.toString() === 'essence')?.stored ??
      0;
    setEssence(e);
    const refreshTimeInMs = 3000;
    const refreshTimeInSec = refreshTimeInMs / 1000;
    const refreshTimeInHours = refreshTimeInSec / 3600;
    setInterval(() => {
      if (generation) {
        setEssence(ess => parseFloat((ess + generation * refreshTimeInHours).toFixed(2)));
      }
    }, refreshTimeInMs);
  }, [result]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HeaderWrapper position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Essence: {essence}
          </Typography>
        </Toolbar>
      </HeaderWrapper>
    </Box>
  );
}
