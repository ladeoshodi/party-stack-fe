import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IUser } from "../interfaces/user";
import { IGame } from "../interfaces/game";
import GameCard from "./GameCard";
import { getAxiosErrorMessage } from "../utils/utils";
import { toast } from "bulma-toast";
import { baseUrl } from "../config";

function Favourites() {
  const [favourites, setFavourites] = useState<IGame[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchCurrentUserFavourites() {
      try {
        const URL = `${baseUrl}/user`;
        const response = await axios.get<IUser>(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.favourites) {
          setFavourites(response.data.favourites);
        }
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
      }
    }

    if (token) {
      void fetchCurrentUserFavourites();
    }
  }, []);

  return (
    <>
      <section className="section has-text-centered">
        <h1 className="title">
          Favourites{" "}
          <span className="icon">
            <i className="fas fa-heart"></i>
          </span>
        </h1>
      </section>
      <section className="section">
        <div className="columns is-multiline">
          {favourites?.map((game) => {
            return (
              <div key={game._id} className="column is-one-third">
                <GameCard game={game} />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Favourites;
