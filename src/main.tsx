import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Home from "./components/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "home", element: <p>Home Content Page</p> },
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
