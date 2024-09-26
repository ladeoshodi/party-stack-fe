import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IGame } from "../interfaces/game";
import { useNavigate } from "react-router-dom";
import { toast } from "bulma-toast";
import { getAxiosErrorMessage } from "../utils/utils";

interface GameFormProp {
  editGame?: boolean;
  game?: IGame | null;
}

interface IFormData {
  title: string;
  imageUrl: string;
  description: string;
  gameSetup: string;
  howToPlay: string;
  rating: number;
}

function GameForm({ editGame = false, game = null }: GameFormProp) {
  const initialFormData = {
    title: "",
    imageUrl: "",
    description: "",
    gameSetup: "",
    howToPlay: "",
    rating: 0,
  };

  const [formData, setFormData] = useState<IFormData>(initialFormData);
  const navigate = useNavigate();

  useEffect(() => {
    // populate form with the existing game data
    if (editGame) {
      const updatedFormData = {
        title: game?.title ?? "",
        imageUrl: game?.imageUrl ?? "",
        description: game?.description ?? "",
        gameSetup: game?.gameSetup ?? "",
        howToPlay: game?.howToPlay ?? "",
        rating: game?.rating ?? 0,
      };
      setFormData(updatedFormData);
    }
  }, [editGame, game]);

  async function submitNewGame() {
    try {
      const token = localStorage.getItem("token");
      const URL = "/api/games";
      const response = await axios.post<IGame>(URL, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        message: `${response.data.title}, created`,
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
      });

      navigate(`/games/${response.data._id}`);
    } catch (e) {
      console.error(e);
    }
  }

  async function editCurrentGame() {
    try {
      const token = localStorage.getItem("token");
      const URL = `/api/games/${game?._id}`;
      await axios.put<IGame>(URL, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        message: "Game Updated!",
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
      });

      navigate(0);
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
      console.error(e);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!editGame) {
      void submitNewGame();
    } else {
      void editCurrentGame();
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLElement>) {
    const target = e.target as HTMLInputElement;
    const newFormData = {
      ...formData,
      [target.name]: target.value,
    };

    setFormData(newFormData);
  }

  return (
    <form className="box" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title" className="label has-text-grey-dark">
          Game Title
        </label>
        <div className="control">
          <input
            id="title"
            className="input"
            type="text"
            placeholder="Enter game title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="imageUrl" className="label has-text-grey-dark">
          Game Image (URL)
        </label>
        <div className="control">
          <input
            id="imageUrl"
            className="input"
            type="url"
            placeholder="Enter a URL for the game image"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="description" className="label has-text-grey-dark">
          Game Description
        </label>
        <div className="control">
          <textarea
            id="description"
            className="textarea"
            placeholder="Enter a description of the game"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
      </div>
      <div className="field">
        <label htmlFor="gameSetup" className="label has-text-grey-dark">
          Game Setup
        </label>
        <div className="control">
          <textarea
            id="gameSetup"
            className="textarea"
            placeholder={
              "How to setup the game (enter one instruction per line) \n e.g. \n 1. Game setup instruction 1 \n 2. Game setup instruction 2"
            }
            name="gameSetup"
            value={formData.gameSetup}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
      </div>
      <div className="field">
        <label htmlFor="howToPlay" className="label has-text-grey-dark">
          How To Play
        </label>
        <div className="control">
          <textarea
            id="howToPlay"
            className="textarea"
            placeholder={
              "How to play (enter one instruction per line) \n e.g. \n 1. How to play instructions 1 \n 2. how to play instruction 2"
            }
            name="howToPlay"
            value={formData.howToPlay}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
      </div>
      <div className="field">
        <label htmlFor="rating" className="label has-text-grey-dark">
          Game Rating (0-5)
        </label>
        <div className="control">
          <input
            id="rating"
            className="input"
            type="number"
            name="rating"
            placeholder="Enter a rating between 0 (unrated) - 5"
            min="0"
            max="5"
            step="1"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button className="button">
        {editGame ? "Edit Game" : "Submit New Game"}
      </button>
    </form>
  );
}

export default GameForm;
