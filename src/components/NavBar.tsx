import { MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user";

interface NavBarProps {
  user: IUser | null;
}

function NavBar({ user }: NavBarProps) {
  const navigate = useNavigate();

  function handleLogOut(e: MouseEvent) {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/home" className="navbar-item">
            Home
          </Link>
          <Link to="/favourites" className="navbar-item">
            Favourites
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            <figure className="image">
              <img
                className="is-rounded"
                src={
                  user?.imageUrl ??
                  "https://bulma.io/assets/images/placeholders/128x128.png"
                }
              />
            </figure>

            <div className="navbar-dropdown">
              <Link to="/profile" className="navbar-item">
                Profile
              </Link>
              <Link to="/submit-game" className="navbar-item">
                Submit a new game
              </Link>
              <hr className="navbar-divider" />
              <Link to="#" className="navbar-item" onClick={handleLogOut}>
                Logout
              </Link>
            </div>
          </div>
          <div className="navbar-item">Welcome {user?.username}</div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
