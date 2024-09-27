import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user";
import axios, { AxiosError } from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { ContextType } from "../interfaces/ContextType";
import { getAxiosErrorMessage } from "../utils/utils";
import { toast } from "bulma-toast";
import { baseUrl } from "../config";

function Home() {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchUser() {
      try {
        const URL = `${baseUrl}/user`;
        const response = await axios.get<IUser>(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (e) {
        if (e instanceof AxiosError) {
          const message = getAxiosErrorMessage(e);
          toast({
            message: message,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        }
        // navigate back to landing page if error in getting user
        navigate("/");
      }
    }
    if (token) {
      void fetchUser();
    } else {
      // navigate back to landing page if no token
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <NavBar user={user} />
      <div className="main">
        <Outlet context={{ user } satisfies ContextType} />
      </div>
      <Footer />
    </>
  );
}

export default Home;
