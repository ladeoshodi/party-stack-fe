import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

function LandingPage() {
  const [showLogin, setShowLogin] = useState(true);
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
