import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useUser } from "../hooks/useUser";
import { IComment } from "../interfaces/comment";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { toast } from "bulma-toast";
import { getAxiosErrorMessage } from "../utils/utils";

interface IFormData {
  text: string;
  game?: string;
}

function Comments() {
  const initialFormData = {
    text: "",
  };

  const [comments, setComments] = useState<IComment[] | null>(null);
  const [formData, setFormData] = useState<IFormData>(initialFormData);
  const [isEditComment, setIsEditComment] = useState<boolean>(false);

  const { user } = useUser();
  const { gameId } = useParams();
  const commentFormRef = useRef<HTMLFormElement | null>(null);
  const currentCommentRef = useRef<string | null>(null);

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
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLElement>) {
    const target = e.target as HTMLInputElement;
    const newFormData = {
      ...formData,
      [target.name]: target.value,
    };

    if (!isEditComment) {
      newFormData.game = gameId;
    }

    setFormData(newFormData);
  }

  function cancelEdit() {
    setIsEditComment(false);
    setFormData(initialFormData);
  }

  function closeEditForm(e: MouseEvent) {
    e.preventDefault();
    cancelEdit();
  }

  function shouldEditComment(commentText: string, commentId: string) {
    setIsEditComment(true);
    setFormData({ text: commentText });
    currentCommentRef.current = commentId;
    commentFormRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  async function submitEdit(e: MouseEvent) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const URL = `/api/comments/${currentCommentRef.current}`;
      await axios.put<IComment>(URL, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        message: "Comment Updated!",
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
      });

      cancelEdit();
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

  async function deleteComment(commentId: string) {
    try {
      const token = localStorage.getItem("token");
      const URL = `/api/comments/${commentId}`;
      await axios.delete(URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        message: "Comment Deleted!",
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
      });
      setFormData(initialFormData);
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

  return (
    <section className="section ps-game-detail has-background-link-light">
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
              className="box"
              ref={commentFormRef}
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
                  {isEditComment ? (
                    <>
                      <div className="level-item">
                        <button
                          className="button is-success"
                          onClick={(e) => void submitEdit(e)}
                        >
                          Edit comment
                        </button>
                      </div>
                      <div className="level-item">
                        <button
                          className="button is-danger"
                          onClick={closeEditForm}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="level-item">
                      <button className="button is-dark">Submit</button>
                    </div>
                  )}
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
                  <p className="has-text-link-dark">
                    <span className="is-size-5 has-text-weight-bold">
                      {comment.author.username}
                    </span>{" "}
                    <br />
                    <span className="is-size-6">{comment.text}</span>
                    <br />
                    <small>
                      <i>{new Date(comment.updatedAt).toLocaleString()}</i>
                    </small>
                  </p>
                </div>
                <nav className="level is-mobile">
                  <div className="level-left">
                    {user?._id === comment.author._id && (
                      <>
                        <div className="level-item">
                          <button
                            className="button is-success is-small"
                            onClick={() => {
                              shouldEditComment(comment.text, comment._id);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                        <div className="level-item">
                          <button
                            className="button is-danger is-small"
                            onClick={() => void deleteComment(comment._id)}
                          >
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
