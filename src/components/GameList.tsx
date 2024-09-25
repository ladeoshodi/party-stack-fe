import axios from "axios";
import { useEffect, useState } from "react";
import { IGame } from "../interfaces/game";
import { Link } from "react-router-dom";

function GameList() {
  const [games, setGames] = useState<IGame[] | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchGames() {
      try {
        const URL = "/api/games";
        const response = await axios.get<IGame[]>(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGames(response.data);
      } catch (e) {
        console.error(e);
      }
    }

    if (token) {
      void fetchGames();
    }
  }, []);

  return (
    <>
      <section className="section">
        <h1 className="title">
          Top Games{" "}
          <span className="icon">
            <i className="fas fa-star"></i>
          </span>
        </h1>
      </section>
      <section className="section">
        <h1 className="title">All Games</h1>
        <div className="columns is-multiline">
          {games?.map((game) => {
            return (
              <div key={game._id} className="column is-one-third">
                <Link to={`/games/${game._id}`}>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src={
                            game.imageUrl ??
                            "https://bulma.io/assets/images/placeholders/1280x960.png"
                          }
                          alt={`${game.title} image`}
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="level">
                        <div className="level-left">
                          <div className="level-item">
                            <p className="title is-4">{game.title}</p>
                          </div>
                          <div className="level-item">
                            {Array.from(
                              { length: game.rating ?? 0 },
                              (_, key) => {
                                return (
                                  <span key={key} className="icon">
                                    <i className="fas fa-star"></i>
                                  </span>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-content">
                      <p className="subtitle is-6">Description</p>
                      <p className="is-size-6">{game.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default GameList;
