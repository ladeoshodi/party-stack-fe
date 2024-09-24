import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

function LandingPage() {
  const [showRegistration, setShowRegistration] = useState(true);
  return (
    <>
      <section className="hero is-success is-fullheight">
        <div className="hero-body">
          <div className="">
            <p className="title">Party Stack</p>
            <p className="subtitle">
              An online repository of indoor party games
            </p>

            {showRegistration ? <Register /> : <Login />}
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
