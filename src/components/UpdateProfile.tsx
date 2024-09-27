import {
  ChangeEvent,
  FormEvent,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IUser } from "../interfaces/user";
import { toast } from "bulma-toast";
import axios, { AxiosError } from "axios";
import { getAxiosErrorMessage } from "../utils/utils";
import { baseUrl } from "../config";

interface UpdateProfileProp {
  currentUser: IUser | null;
  showUpdateProfileModal: () => void;
  setCurrentUser: (user: IUser) => void;
}

interface IProfileFormData {
  username: string | undefined;
  email: string | undefined;
  imageUrl: string | undefined;
}

const UpdateProfile = forwardRef<HTMLDivElement, UpdateProfileProp>(
  function UpdateProfile(
    { currentUser, showUpdateProfileModal, setCurrentUser },
    ref
  ) {
    const initialProfileFormData = useMemo(
      () => ({
        username: currentUser?.username,
        email: currentUser?.email,
        imageUrl: currentUser?.imageUrl,
      }),
      [currentUser]
    );
    const [profileFormData, setProfileFormData] = useState<IProfileFormData>(
      initialProfileFormData
    );

    useEffect(
      () => setProfileFormData(initialProfileFormData),
      [initialProfileFormData]
    );

    function handleInputChange(e: ChangeEvent<HTMLElement>) {
      const target = e.target as HTMLInputElement;

      const newFormData = {
        ...profileFormData,
        [target.name]: target.value,
      };
      setProfileFormData(newFormData);
    }

    async function handleUpdateProfile(e: FormEvent) {
      e.preventDefault();
      try {
        const token = localStorage.getItem("token");
        const URL = `${baseUrl}/user`;
        const response = await axios.put<IUser>(URL, profileFormData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUser(response.data);
        // close modal
        showUpdateProfileModal();
        toast({
          message: "User profile updated",
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

    return (
      <>
        <div className="modal" ref={ref}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <h1 className="title has-text-centered">Edit User Profile</h1>
            <form className="box" onSubmit={(e) => void handleUpdateProfile(e)}>
              <div className="field">
                <label htmlFor="username" className="label has-text-grey-dark">
                  Username
                </label>
                <div className="control">
                  <input
                    id="username"
                    className="input"
                    type="text"
                    placeholder="Update username"
                    name="username"
                    value={profileFormData.username ?? ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="email" className="label has-text-grey-dark">
                  Email
                </label>
                <div className="control">
                  <input
                    id="email"
                    className="input"
                    type="email"
                    placeholder="Update Email"
                    name="email"
                    value={profileFormData.email ?? ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label
                  htmlFor="profileImage"
                  className="label has-text-grey-dark"
                >
                  Profile Image
                </label>
                <div className="control">
                  <input
                    id="profileImage"
                    className="input"
                    type="url"
                    placeholder="Update profile image"
                    name="imageUrl"
                    value={profileFormData.imageUrl ?? ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <button className="button">Update Profile</button>
            </form>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={showUpdateProfileModal}
          ></button>
        </div>
      </>
    );
  }
);

export default UpdateProfile;
