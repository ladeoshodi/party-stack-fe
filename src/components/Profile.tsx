import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { IGame } from "../interfaces/game";
import axios, { AxiosError } from "axios";
import { toast } from "bulma-toast";
import { getAxiosErrorMessage } from "../utils/utils";
import GameCard from "./GameCard";
import { Link } from "react-router-dom";
import { IComment } from "../interfaces/comment";

function Profile() {
  const { user } = useUser();
  const [userGames, setUserGames] = useState<IGame[] | null>(null);
  const [userComments, setUserComments] = useState<IComment[] | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchUserGames() {
      try {
        const URL = "/api/games?creator=true";
        const response = await axios.get<IGame[]>(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserGames(response.data);
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
      void fetchUserGames();
    }
  }, []);

  return (
    <>
      <section className="section">
        <h1 className="title has-text-centered">User Profile</h1>
        <div className="columns is-vcentered is-centered">
          <div className="column is-one-third flex-center-x">
            <figure className="image is-128x128">
              <img
                src={
                  user?.imageUrl
                    ? user.imageUrl
                    : "https://bulma.io/assets/images/placeholders/128x128.png"
                }
                alt="Image"
              />
            </figure>
          </div>
          <div className="column flex-column-center-x">
            <div className="block">
              <p className="is-size-3 has-text-primary has-text-weight-bold">
                {user?.username}
              </p>
            </div>
            <div className="block">
              <nav className="level is-mobile">
                <div className="level-left">
                  <div className="level-item">
                    <button className="button is-medium">Update Profile</button>
                  </div>
                  <div className="level-item">
                    <button className="button is-medium is-link">
                      Change Password
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <hr className="horizontal-rule" />
      <section className="section">
        <h1 className="title has-text-centered">Your Games</h1>
        <div className="columns is-multiline">
          {userGames?.map((game) => {
            return (
              <div key={game._id} className="column is-one-third">
                <GameCard game={game} />
              </div>
            );
          })}
        </div>
        <div className="container has-text-centered">
          <Link to="/submit-game" className="button is-link">
            Submit a new game
          </Link>
        </div>
      </section>
      <hr className="horizontal-rule" />
      <section className="section">
        <h1 className="title has-text-centered">Your Comments</h1>
      </section>
      <hr className="horizontal-rule" />
      <section className="section">
        <h1 className="title has-text-centered has-text-danger">DANGER ZONE</h1>
        <div className="container has-text-centered">
          <button className="button is-danger">DELETE ACCOUNT</button>
        </div>
      </section>
      <hr className="horizontal-rule" />
    </>
  );
}

export default Profile;
