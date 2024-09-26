import { Link } from "react-router-dom";
import { IGame } from "../interfaces/game";

interface GameCardProp {
  game: IGame;
}

function GameCard({ game }: GameCardProp) {
  return (
    <Link to={`/games/${game._id}`}>
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src={
                game.imageUrl
                  ? game.imageUrl
                  : "https://bulma.io/assets/images/placeholders/1280x960.png"
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
                {Array.from({ length: game.rating ?? 0 }, (_, key) => {
                  return (
                    <span key={key} className="icon">
                      <i className="fas fa-star"></i>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="card-content">
          <p className="subtitle is-6">Description</p>
          <p className="is-size-6">{game.description}</p>
        </div>
        <div className="card-content has-text-right is-italic">
          <p className="is-size-7">Created by: {game.creator.username}</p>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;
