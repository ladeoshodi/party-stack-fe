import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user";

import axios from "axios";
function Home() {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  async function fetchUser(token: string) {
    try {
      const URL = "/api/user";
      const response = await axios.get<IUser>(URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  console.log(user);

  return <p>Home</p>;
}

export default Home;
