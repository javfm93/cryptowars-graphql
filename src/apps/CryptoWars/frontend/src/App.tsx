import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TownPage } from './Pages/Town/TownPage';
import { Layout } from './Layout/Layout';
import './I18n';
import { Registration } from './Pages/Registration/RegistrationPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { HeadquarterPage } from './Pages/Headquarter/HeadquarterPage';
import { WorldPage } from './Pages/World/WorldPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Home } from './Pages/Home/HomePage';
import { Login } from './Pages/Login/LoginPage';
import { SelectWorld } from './Pages/SelectWorld/SelectWorldPage';
import { ChatPage } from './Pages/Chat/ChatPage';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

export const AppRoutes = {
  selectWorld: '/select-world',
  town: (id: string) => `/towns/${id}`,
  home: '/',
  registration: '/registration',
  login: '/login',
  headquarter: (id: string) => `/towns/${id}/headquarter`,
  world: (id: string) => `/worlds/${id}`,
  chat: '/chat'
};

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache(),
  credentials: 'include'
});

export const App = () => {
  const theme = createTheme();
  const queryClient = new QueryClient();

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path={AppRoutes.home} element={<Home />} />
                <Route path={AppRoutes.selectWorld} element={<SelectWorld />} />
                <Route path={AppRoutes.town(':id')} element={<TownPage />} />
                <Route path={AppRoutes.registration} element={<Registration />} />
                <Route path={AppRoutes.login} element={<Login />} />
                <Route path={AppRoutes.headquarter(':id')} element={<HeadquarterPage />} />
                <Route path={AppRoutes.world(':id')} element={<WorldPage />} />
                <Route path={AppRoutes.chat} element={<ChatPage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
};
