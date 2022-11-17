import { FC } from 'react';
import { CircularProgress, Grid } from '@mui/material';

interface LayoutProps {
  tittle: string;
  isLoading: boolean;
  error: null | unknown;
  children: JSX.Element | null;
}

export const Layout: FC<LayoutProps> = ({ children, error, isLoading, tittle }) => (
  <Grid container justifyContent={'center'} textAlign={'center'}>
    <Grid item xs={12} justifyContent={'center'}>
      <h2>{tittle}</h2>
    </Grid>

    <Grid item xs={12} justifyContent={'center'}>
      {isLoading ? <CircularProgress /> : error ? <p>An error happened</p> : children}
    </Grid>
  </Grid>
);
