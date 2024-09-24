import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "bulma-toast";

interface IShowLogin {
  setShowLogin: (showLogin: boolean) => void;
}

interface IApiResponse {
  message: string;
}

function Register({ setShowLogin }: IShowLogin) {
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
      const response = await axios.post<IApiResponse>(URL, formData);
      toast({
        message: response.data.message,
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
      });
      // show the login page
      setShowLogin(true);
    } catch (e: any) {
      toast({
        message: e.response.data.message,
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      console.error(e);
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
      <p className="title has-text-black">Register</p>
      <form onSubmit={handleRegistration}>
        <div className="field">
          <label htmlFor="username" className="label">
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
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <label htmlFor="email" className="label">
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
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <label htmlFor="password" className="label">
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
            />
            <span className="icon is-small is-left">
              <i className="fas fa-key"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <label htmlFor="passwordConfirmation" className="label">
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
