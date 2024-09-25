import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useUser } from "../hooks/useUSer";

function GameForm() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    description: "",
    gameSetup: "",
    howToPlay: "",
    rating: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const targetElement = e.target.name;
    const newFormData = {
      ...formData,
      [targetElement]: e.target.value,
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
            placeholder="Enter Game Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button className="button">Submit New Game</button>
    </form>
  );
}

export default GameForm;
