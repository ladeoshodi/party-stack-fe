import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./LandingPage.tsx";
import Home from "./components/Home.tsx";
import GameList from "./components/GameList.tsx";
import GameDetail from "./components/GameDetail.tsx";
import SubmitGame from "./components/SubmitGame.tsx";
import Favourites from "./components/Favourites.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import Profile from "./components/Profile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "home", element: <GameList /> },
      { path: "games/:gameId", element: <GameDetail /> },
      { path: "favourites", element: <Favourites /> },
      { path: "submit-game", element: <SubmitGame /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
