import axios from "axios";
import { useEffect, useState } from "react";
import { IUser } from "../interfaces/user";
import { IGame } from "../interfaces/game";
import GameCard from "./GameCard";

function Favourites() {
  const [favourites, setFavourites] = useState<IGame[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchCurrentUserFavourites() {
      try {
        const URL = "/api/user";
        const response = await axios.get<IUser>(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.favourites) {
          setFavourites(response.data.favourites);
        }
      } catch (e) {
        console.error(e);
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
