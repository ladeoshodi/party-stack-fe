import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { IComment } from "../interfaces/comment";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { toast } from "bulma-toast";
import { getAxiosErrorMessage } from "../utils/utils";

function Comments() {
  const initialFormData = {
    text: "",
  };

  const [comments, setComments] = useState<IComment[] | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  const { user } = useUser();
  const { gameId } = useParams();

  useEffect(() => {
    // get all comments
    const token = localStorage.getItem("token");

    async function fetchGameComments() {
      try {
        const URL = `/api/comments/?game=${gameId}`;
        const response = await axios.get<IComment[]>(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComments(response.data);
      } catch (e) {
        console.error(e);
      }
    }

    if (token) {
      void fetchGameComments();
    }
  }, [gameId, formData]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const URL = "/api/comments";
      await axios.post<IComment>(URL, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData(initialFormData);
      toast({
        message: "New comment created",
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
      });
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

  function handleInputChange(e: ChangeEvent<HTMLElement>) {
    const target = e.target as HTMLInputElement;
    const newFormData = {
      ...formData,
      [target.name]: target.value,
      game: gameId,
    };

    setFormData(newFormData);
  }

  return (
    <section className="section ps-game-detail">
      <div className="container has-text-centered ">
        <h1 className="title ps-inline margin-right-1x">
          Comments ({comments?.length})
        </h1>
      </div>
      <div className="container">
        <div className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img
                src={
                  user?.imageUrl
                    ? user?.imageUrl
                    : "https://bulma.io/assets/images/placeholders/128x128.png"
                }
              />
            </p>
          </figure>
          <div className="media-content">
            <form
              onSubmit={(e) => {
                void handleSubmit(e);
              }}
            >
              <div className="field">
                <p className="control">
                  <textarea
                    name="text"
                    className="textarea"
                    placeholder="Add a comment..."
                    value={formData.text}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </p>
              </div>
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <button className="button is-dark">Submit</button>
                  </div>
                </div>
              </nav>
            </form>
          </div>
        </div>
      </div>
      {comments?.map((comment) => {
        return (
          <div key={comment._id} className="container">
            <div className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img
                    src={
                      comment.author.imageUrl
                        ? comment.author.imageUrl
                        : "https://bulma.io/assets/images/placeholders/128x128.png"
                    }
                  />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{comment.author.username}</strong>{" "}
                    <small>
                      {new Date(comment.createdAt).toLocaleString()}
                    </small>
                    <br />
                    {comment.text}
                  </p>
                </div>
                <nav className="level is-mobile">
                  <div className="level-left">
                    {user?._id === comment.author._id && (
                      <>
                        <div className="level-item">
                          <button className="button is-success is-small">
                            Edit
                          </button>
                        </div>
                        <div className="level-item">
                          <button className="button is-danger is-small">
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </nav>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Comments;
