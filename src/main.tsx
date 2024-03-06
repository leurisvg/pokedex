import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App.tsx';
import './styles/_main.scss';
import { EmptyPage } from './pages/EmptyPage.tsx';
import { Pokemon } from './pages/Pokemon.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <EmptyPage/>,
    children: [
      {
        index: true,
        element: <EmptyPage/>,
      },
      {
        path: '/pokemon/:id',
        element: <Pokemon/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={ router }/>
  </React.StrictMode>,
);
