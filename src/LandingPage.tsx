import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

import "./styles/App.css";

function LandingPage() {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Automatically log the user still signed in
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <>
      <section className="hero is-link is-fullheight">
        <div className="hero-body">
          <div className="columns is-vcentered ps-landing-page">
            <div className="column is-two-fifths has-text-centered">
              <span className="icon is-large">
                <i className="fas fa-bolt"></i>
              </span>
              <p className="title">Party Stack</p>
              <p className="subtitle">
                An online repository of indoor party games
              </p>
            </div>
            <div className="column">
              {showLogin ? (
                <Login setShowLogin={setShowLogin} />
              ) : (
                <Register setShowLogin={setShowLogin} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
