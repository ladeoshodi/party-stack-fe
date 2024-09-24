import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IUser } from "./interfaces/user";
import axios from "axios";
import LandingPage from "./components/LandingPage";

function App() {
  // To do: Determine where to direct users depending on if logged in or not
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  async function fetchUser(token: string) {
    try {
      const URL = "/user";
      const response = await axios.get<IUser>(URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      setUser(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      (async () => {
        await fetchUser(token);
      })().catch((e) => {
        console.error(e);
      });
    }
  }, []);

  return (
    <>
      <LandingPage />
    </>
  );
}

export default App;
