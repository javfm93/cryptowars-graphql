import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Village } from './Village';
import { Layout } from './Layout/Layout';

export const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Village />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
