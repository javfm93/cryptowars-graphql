import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Town } from './Pages/Town';
import { Layout } from './Layout/Layout';
import './I18n';
import { Registration } from './Pages/Registration';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Headquarter } from './Pages/Headquarter';
import { World } from './Pages/World';
import { QueryClient, QueryClientProvider } from 'react-query';

export enum AppRoutes {
  town = '/',
  registration = '/registration',
  headquarter = '/headquarter',
  world = '/world'
}

export const App = () => {
  const theme = createTheme();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path={AppRoutes.town} element={<Town />} />
              <Route path={AppRoutes.registration} element={<Registration />} />
              <Route path={AppRoutes.headquarter} element={<Headquarter />} />
              <Route path={AppRoutes.world} element={<World />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
