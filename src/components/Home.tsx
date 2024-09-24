import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user";

import axios from "axios";
function Home() {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchUser(token: string) {
      try {
        const URL = "/api/user";
        const response = await axios.get<IUser>(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (e) {
        console.error(e);
        // navigate back to landing page if error in getting user
        navigate("/");
      }
    }
    if (token) {
      (async () => {
        await fetchUser(token);
      })().catch((e) => {
        console.error(e);
        // navigate back to landing page if error in getting user
        navigate("/");
      });
    } else {
      // navigate back to landing page if no token
      navigate("/");
    }
  }, [navigate]);

  console.log(user);

  //Todo: Add navigation bar and logout functionality

  return <p>Home</p>;
}

export default Home;
