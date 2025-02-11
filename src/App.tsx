import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { AuthGuard } from './components/AuthGuard';
import { Login } from './components/Login';
import { ResourceList } from './components/ResourceList';
import { ResourceDetail } from './components/ResourceDetail';

export const App = () => {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AuthGuard />}>
            <Route path="/" element={<ResourceList />} />
            <Route path="/resource/:id" element={<ResourceDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};