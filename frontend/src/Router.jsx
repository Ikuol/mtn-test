import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "./layouts/MainLayout";

import { MainView } from "./views/MainView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainView />,
      },
    ],
  },
]);
