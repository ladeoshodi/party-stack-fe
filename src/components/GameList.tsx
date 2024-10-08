import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IGame } from "../interfaces/game";
import GameCard from "./GameCard";
import { getAxiosErrorMessage } from "../utils/utils";
import { toast } from "bulma-toast";
import { baseUrl } from "../config";

function GameList() {
  const [games, setGames] = useState<IGame[] | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchGames() {
      try {
        const URL = `${baseUrl}/games`;
        const response = await axios.get<IGame[]>(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGames(response.data);
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
      void fetchGames();
    }
  }, []);

  function getTopGames() {
    const topGames = structuredClone(games);
    topGames?.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return topGames?.slice(0, 3);
  }

  return (
    <>
      <section className="section">
        <h1 className="title">
          Top Games{" "}
          <span className="icon">
            <i className="fas fa-star"></i>
          </span>
        </h1>
        <div className="columns is-multiline">
          {getTopGames()?.map((game) => {
            return (
              <div key={game._id} className="column is-one-third">
                <GameCard game={game} />
              </div>
            );
          })}
        </div>
      </section>
      <section className="section">
        <h1 className="title">All Games</h1>
        <div className="columns is-multiline">
          {games?.map((game) => {
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

export default GameList;
