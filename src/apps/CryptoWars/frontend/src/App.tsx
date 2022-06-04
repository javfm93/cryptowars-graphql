import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Town } from './Town';
import { Layout } from './Layout/Layout';
import './I18n';
import { Registration } from './Registration';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const App = () => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Town />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};
