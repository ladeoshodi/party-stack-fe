import { MouseEvent, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user";

interface NavBarProps {
  user: IUser | null;
}

function NavBar({ user }: NavBarProps) {
  const navigate = useNavigate();
  const navbarMenu = useRef<HTMLDivElement>(null);

  function handleLogOut(e: MouseEvent) {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
  }

  function showNavbar(e: MouseEvent) {
    const target = e.target as HTMLElement;
    target.classList.toggle("is-active");
    navbarMenu.current?.classList.toggle("is-active");
  }

  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          onClick={showNavbar}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className="navbar-menu" ref={navbarMenu}>
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
            <a className="navbar-link">Welcome {user?.username}</a>
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
          <div className="navbar-item hide-on-mobile">
            <figure className="image">
              <img
                className="is-rounded"
                src={
                  user?.imageUrl ??
                  "https://bulma.io/assets/images/placeholders/128x128.png"
                }
              />
            </figure>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
