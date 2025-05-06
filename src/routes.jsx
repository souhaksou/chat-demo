import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Local from "./pages/Local";
// import Login from "./pages/login";
import NotFound from "./pages/Notfound";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "local/:id",
        element: <Local />,
      },
      {
        path: "local",
        element: <Navigate to="/" replace />,
      },
    ],
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;
