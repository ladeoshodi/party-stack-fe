import { ChangeEvent, FormEvent, forwardRef, useState } from "react";
import { IUser } from "../interfaces/user";
import { toast } from "bulma-toast";
import axios, { AxiosError } from "axios";
import { getAxiosErrorMessage } from "../utils/utils";
import { useNavigate } from "react-router-dom";

interface DeleteProfileProp {
  currentUser: IUser | null;
  showDeleteProfileModal: () => void;
}

interface IDeleteFormData {
  confirmUsername: string;
}

const DeleteProfile = forwardRef<HTMLDivElement, DeleteProfileProp>(
  function DeleteProfile({ currentUser, showDeleteProfileModal }, ref) {
    const navigate = useNavigate();
    const initialFormData = {
      confirmUsername: "",
    };
    const [formData, setFormData] = useState<IDeleteFormData>(initialFormData);

    function handleInputChange(e: ChangeEvent<HTMLElement>) {
      const target = e.target as HTMLInputElement;

      const newFormData = {
        ...formData,
        [target.name]: target.value,
      };
      setFormData(newFormData);
    }

    async function handleDeleteProfile(e: FormEvent) {
      e.preventDefault();
      try {
        if (formData.confirmUsername !== currentUser?.username) {
          throw new Error("Mismatched Username!");
        }

        const token = localStorage.getItem("token");
        const URL = "/api/user";
        await axios.delete(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast({
          message: "Profile Deleted",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        // close modal
        showDeleteProfileModal();
        // delete token
        localStorage.removeItem("token");
        // logout user
        navigate("/");
      } catch (e) {
        let message;
        if (e instanceof AxiosError) {
          message = getAxiosErrorMessage(e);
        } else if (e instanceof Error) {
          message = e.message;
        }
        toast({
          message: message ?? "An error occurred, try again later",
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      }
    }

    return (
      <>
        <div className="modal" ref={ref}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="container">
              <h1 className="title has-text-centered">Delete Profile</h1>
              <h3 className="is-size-5 has-text-centered has-text-warning-dark has-text-weight-semibold">
                Are you sure you want to delete your profile?
                <br />
                There is no going back after this
              </h3>
            </div>
            <form className="box" onSubmit={(e) => void handleDeleteProfile(e)}>
              <div className="field">
                <label
                  htmlFor="confirmUsername"
                  className="label has-text-grey-dark"
                >
                  Confirm Username
                </label>
                <div className="control">
                  <input
                    id="confirmUsername"
                    className="input"
                    type="text"
                    placeholder="Confirm username"
                    name="confirmUsername"
                    value={formData.confirmUsername}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <button className="button is-danger">Confirm Delete</button>
            </form>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={showDeleteProfileModal}
          ></button>
        </div>
      </>
    );
  }
);

export default DeleteProfile;
