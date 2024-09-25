import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./LandingPage.tsx";
import Home from "./components/Home.tsx";
import GameList from "./components/GameList.tsx";
import GameDetail from "./components/GameDetail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "home", element: <GameList /> },
      { path: "games/:gameId", element: <GameDetail /> },
      { path: "favourites", element: <p>Favourites</p> },
      { path: "submit-game", element: <p>Submit New Game</p> },
      { path: "profile", element: <p>User Profile</p> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
