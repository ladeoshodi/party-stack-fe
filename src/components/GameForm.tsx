import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useUser } from "../hooks/useUSer";
import { IGame } from "../interfaces/game";
import { useNavigate } from "react-router-dom";
import { toast } from "bulma-toast";

function GameForm() {
  const initialFormData = {
    title: "",
    imageUrl: "",
    description: "",
    gameSetup: "",
    howToPlay: "",
    rating: "",
  };
  const { user } = useUser();
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const URL = "/api/games";
      const response = await axios.post<IGame>(URL, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        message: `New game, ${response.data.title}, created`,
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
      });

      navigate("/home");
    } catch (e) {
      console.error(e);
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLElement>) {
    const target = e.target as HTMLInputElement;
    const newFormData = {
      ...formData,
      [target.name]: target.value,
      creator: user?._id,
    };
    setFormData(newFormData);
  }

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
    >
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
            required
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
      <button className="button">Submit New Game</button>
    </form>
  );
}

export default GameForm;
