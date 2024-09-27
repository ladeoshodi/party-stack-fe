import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "bulma-toast";
import { IRegisterApiResponse } from "../interfaces/api";
import { getAxiosErrorMessage } from "../utils/utils";

interface RegisterProps {
  setShowLogin: (showLogin: boolean) => void;
}

function Register({ setShowLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  async function handleRegistration(e: FormEvent) {
    e.preventDefault();
    try {
      const URL = "/api/user/register";
      const response = await axios.post<IRegisterApiResponse>(URL, formData);
      toast({
        message: response.data.message,
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
      });
      // redirect to login on successful registration
      setShowLogin(true);
    } catch (e: unknown) {
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

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const targetElement = e.target.name;
    const newFormData = {
      ...formData,
      [targetElement]: e.target.value,
    };
    setFormData(newFormData);
  }

  return (
    <section className="section ps-form">
      <p className="title has-text-grey-dark">Register</p>
      <form
        className="box"
        onSubmit={(e) => {
          void handleRegistration(e);
        }}
      >
        <div className="field">
          <label htmlFor="username" className="label has-text-grey-dark">
            Username
          </label>
          <div className="control has-icons-left">
            <input
              id="username"
              className="input"
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <label htmlFor="email" className="label has-text-grey-dark">
            Email
          </label>
          <div className="control has-icons-left">
            <input
              id="email"
              className="input"
              type="text"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <label htmlFor="password" className="label has-text-grey-dark">
            Password
          </label>
          <div className="control has-icons-left">
            <input
              id="password"
              className="input"
              type="text"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-key"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <label
            htmlFor="passwordConfirmation"
            className="label has-text-grey-dark"
          >
            Confirm Password
          </label>
          <div className="control has-icons-left">
            <input
              id="passwordConfirmation"
              className="input"
              type="text"
              placeholder="Confirm Password"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleInputChange}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-key"></i>
            </span>
          </div>
        </div>
        <button className="button">Register</button>
      </form>
      <p
        className="hover-pointer"
        onClick={() => {
          setShowLogin(true);
        }}
      >
        Have an account? Click to Login
      </p>
    </section>
  );
}

export default Register;
