import { createBrowserRouter, RouteObject } from "react-router-dom";

import PrivateRoutes from "../components/PrivateRoutes";
import MainWrapper from "../components/MainWrapper";
import GamePage from "../pages/gamePage/GamePage";
import MainPage from "../pages/mainPage/MainPage";
import LoginPage from "../pages/loginPage/LoginPage";

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainWrapper />,
    children: [
      {
        path: "live/:gameId",
        element: <GamePage />,
      },
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "*",
        element: (
          <div className="w-full height_without_header flex justify-center items-center">
            Page Not Found
          </div>
        ),
      },
    ],
  },
];

const routes: RouteObject[] = [
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [...privateRoutes],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
];

export const router = createBrowserRouter(routes);
