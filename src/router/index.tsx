import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import About from '../pages/About';
import GameDetails from '../pages/GameDetails';
import Home from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/games/:id',
        element: <GameDetails />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
]);

export default router;
