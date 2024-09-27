import { ChangeEvent, FormEvent, forwardRef, useState } from "react";
import { IUser } from "../interfaces/user";
import axios, { AxiosError } from "axios";
import { toast } from "bulma-toast";
import { getAxiosErrorMessage } from "../utils/utils";
import { baseUrl } from "../config";

interface UpdatePasswordProp {
  showUpdatePasswordModal: () => void;
  setCurrentUser: (user: IUser) => void;
}

interface IPasswordFormData {
  password: string;
  confirmPassword: string;
}

const UpdatePassword = forwardRef<HTMLDivElement, UpdatePasswordProp>(
  function UpdatePassword({ showUpdatePasswordModal, setCurrentUser }, ref) {
    const initialFormData = {
      password: "",
      confirmPassword: "",
    };

    const [formData, setFormData] =
      useState<IPasswordFormData>(initialFormData);

    function handleInputChange(e: ChangeEvent<HTMLElement>) {
      const target = e.target as HTMLInputElement;

      const newFormData = {
        ...formData,
        [target.name]: target.value,
      };
      setFormData(newFormData);
    }

    async function handleUpdatePassword(e: FormEvent) {
      e.preventDefault();
      try {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Mismatched Passwords!");
        }

        const token = localStorage.getItem("token");
        const URL = `${baseUrl}/user`;
        const response = await axios.put<IUser>(URL, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUser(response.data);
        // close modal
        showUpdatePasswordModal();
        toast({
          message: "Password updated successfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
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
            <h1 className="title has-text-centered">Update Password</h1>
            <form
              className="box"
              onSubmit={(e) => void handleUpdatePassword(e)}
            >
              <div className="field">
                <label htmlFor="password" className="label has-text-grey-dark">
                  New Password
                </label>
                <div className="control">
                  <input
                    id="password"
                    className="input"
                    type="text"
                    placeholder="Enter new password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label
                  htmlFor="confirmPassword"
                  className="label has-text-grey-dark"
                >
                  Confirm New Password
                </label>
                <div className="control">
                  <input
                    id="confirmPassword"
                    className="input"
                    type="text"
                    placeholder="Confirm new password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <button className="button">Update Password</button>
            </form>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={showUpdatePasswordModal}
          ></button>
        </div>
      </>
    );
  }
);

export default UpdatePassword;
