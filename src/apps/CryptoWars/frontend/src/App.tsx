import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Town } from './Pages/Town';
import { Layout } from './Layout/Layout';
import './I18n';
import { Registration } from './Pages/Registration';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Headquarter } from './Pages/Headquarter';

export enum AppRoutes {
  town = '/',
  registration = '/registration',
  headquarter = 'headquarter'
}

export const App = () => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path={AppRoutes.town} element={<Town />} />
            <Route path={AppRoutes.registration} element={<Registration />} />
            <Route path={AppRoutes.headquarter} element={<Headquarter />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};
