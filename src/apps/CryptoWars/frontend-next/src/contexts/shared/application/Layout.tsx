import { Grid } from '@mui/material';
import { FC } from 'react';

interface LayoutProps {
  tittle: string;
  children: JSX.Element | null;
}

export const Layout: FC<LayoutProps> = ({ children, tittle }) => (
  <Grid container justifyContent={'center'} textAlign={'center'}>
    <Grid item xs={12} justifyContent={'center'}>
      <h2>{tittle}</h2>
    </Grid>

    <Grid item xs={12} justifyContent={'center'}>
      {children}
    </Grid>
  </Grid>
);
