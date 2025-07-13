import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Homepage } from './pages';
import { lazy, Suspense } from 'react';
import { Center, Loader } from '@mantine/core';
const Glossary = lazy(() =>
  import('./pages').then((module) => ({
    default: module.Glossary,
  }))
);

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/glossary"
          element={
            <Suspense
              fallback={
                <Center h="100vh">
                  <Loader color="blue" size="lg" />
                </Center>
              }
            >
              <Glossary />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
