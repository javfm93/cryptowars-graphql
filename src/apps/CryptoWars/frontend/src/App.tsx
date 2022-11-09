import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Town } from './Pages/Town';
import { Layout } from './Layout/Layout';
import './I18n';
import { Registration } from './Pages/Registration';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Headquarter } from './Pages/Headquarter';
import { World } from './Pages/World';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { SelectWorld } from './Pages/SelectWorld';

export const AppRoutes = {
  selectWorld: '/select-world',
  town: (id: string) => `/town/${id}`,
  home: '/',
  registration: '/registration',
  login: '/login',
  headquarter: (id: string) => `/town/${id}/headquarter`,
  world: '/world'
};

export const App = () => {
  const theme = createTheme();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path={AppRoutes.home} element={<Home />} />
              <Route path={AppRoutes.selectWorld} element={<SelectWorld />} />
              <Route path={AppRoutes.town(':id')} element={<Town />} />
              <Route path={AppRoutes.registration} element={<Registration />} />
              <Route path={AppRoutes.login} element={<Login />} />
              <Route path={AppRoutes.headquarter(':id')} element={<Headquarter />} />
              <Route path={AppRoutes.world} element={<World />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
