import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Homepage } from './pages';
import { lazy, Suspense } from 'react';
const Glossary = lazy(() =>
  import('./pages').then(module => ({
    default: module.Glossary
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
            <Suspense fallback={<p>Загрузка страницы...</p>}>
              <Glossary />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
