import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { IGame } from "../interfaces/game";
import { IUser } from "../interfaces/user";
import { useUser } from "../hooks/useUSer";
import GameForm from "./GameForm";

function GameDetail() {
  const [game, setGame] = useState<IGame | null>(null);
  const [isUserFavourite, setIsUserFavourite] = useState<boolean>(false);
  const [editGame, setEditGame] = useState<boolean>(false);

  const { gameId } = useParams();
  const { user } = useUser();
  const editGameModal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchGame() {
      try {
        const URL = `/api/games/${gameId}`;
        const response = await axios.get<IGame>(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGame(response.data);
      } catch (e) {
        console.error(e);
      }
    }

    if (token) {
      void fetchGame();
    }
  }, [gameId]);

  useEffect(() => {
    // check and set if game is part of the current User's favourites
    const token = localStorage.getItem("token");

    function isCurrentGameAFavourite(favourites: IGame[]) {
      return favourites.some((game) => game._id === gameId);
    }

    async function fetchCurrentUser() {
      try {
        const URL = "/api/user";
        const response = await axios.get<IUser>(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.favourites) {
          if (isCurrentGameAFavourite(response.data.favourites)) {
            setIsUserFavourite(true);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (token) {
      void fetchCurrentUser();
    }
  }, [gameId]);

  async function toggleFavourite() {
    // Add or remove from Favourites
    const token = localStorage.getItem("token");

    if (isUserFavourite) {
      try {
        const URL = `/api/favourites/${gameId}`;
        await axios.delete(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsUserFavourite(false);
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        const URL = "/api/favourites";
        const data = { favourites: gameId };
        await axios.post(URL, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsUserFavourite(true);
      } catch (e) {
        console.error(e);
      }
    }
  }

  function showEditGame() {
    editGameModal.current?.classList.toggle("is-active");
    if (editGame) {
      setEditGame(false);
    } else {
      setEditGame(true);
    }
  }

  async function deleteGame() {
    //
  }

  return (
    <>
      <section className="section has-text-centered ps-game-detail">
        <div className="container">
          <h1 className="title ps-inline margin-right-1x">{game?.title}</h1>
          {Array.from({ length: game?.rating ?? 0 }, (_, key) => {
            return (
              <span key={key} className="icon margin-right-1x">
                <i className="fas fa-star fa-2x"></i>
              </span>
            );
          })}
        </div>
        <div className="container">
          <p className="">{game?.description}</p>
        </div>
        <div className="container">
          <figure className="image is-4by3">
            <img
              src={
                game?.imageUrl
                  ? game.imageUrl
                  : "https://bulma.io/assets/images/placeholders/1280x960.png"
              }
              alt={`${game?.title} image`}
            />
          </figure>
        </div>
        <div className="container">
          <h2 className="title is-4">How to setup the game</h2>
          {game?.gameSetup.split("\n").map((line, key) => (
            <p key={key}>{line}</p>
          ))}
        </div>
        <div className="container">
          <h2 className="title is-4">How to play</h2>
          {game?.howToPlay.split("\n").map((line, key) => (
            <p key={key}>{line}</p>
          ))}
        </div>
        <div className="container ps-game-detail-footer">
          <p className="is-size-7 margin-right-1x">
            Created by: {game?.creator.username}
          </p>
          <div
            className="ps-inline hover-pointer margin-right-1x"
            onClick={() => void toggleFavourite()}
          >
            {isUserFavourite ? (
              <span className="icon">
                <i className="fas fa-heart fa-lg"></i>
              </span>
            ) : (
              <span className="icon">
                <i className="far fa-heart fa-lg"></i>
              </span>
            )}
          </div>
          {user?._id === game?.creator._id && (
            <>
              <div className="modal" ref={editGameModal}>
                <div className="modal-background"></div>
                <div className="modal-content">
                  <h1 className="title has-text-centered">Edit Current Game</h1>
                  <GameForm editGame={editGame} game={game} />
                </div>
                <button
                  className="modal-close is-large"
                  aria-label="close"
                  onClick={showEditGame}
                ></button>
              </div>
              <button
                className="button is-success is-small margin-right-1x"
                onClick={showEditGame}
              >
                Edit
              </button>
              <button
                className="button is-danger is-small"
                onClick={() => void deleteGame}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </section>
      <hr />
    </>
  );
}

export default GameDetail;
