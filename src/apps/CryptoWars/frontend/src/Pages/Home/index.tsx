import * as React from 'react';
import { Button, CircularProgress, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useWorlds } from './useWorlds';

export const Home = () => {
  const { t } = useTranslation();
  const worlds = useWorlds();

  return (
    <Grid container justifyContent={'center'} textAlign={'center'}>
      <Grid item xs={12} justifyContent={'center'}>
        <h2>{t('home.startPlaying')}</h2>
      </Grid>

      <Grid item xs={12} justifyContent={'center'}>
        {worlds.isLoading ? (
          <CircularProgress />
        ) : worlds.error ? (
          <p>An error happened</p>
        ) : (
          worlds.result?.worlds.map(world => <Button key={world.id}>{world.name}</Button>)
        )}
      </Grid>
    </Grid>
  );
};