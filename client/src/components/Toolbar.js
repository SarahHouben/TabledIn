import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/api";
import DrawerToggleButton from "./DrawerToggleButton";

//Logout function
const handleLogout = props => {
  //logs user out
  logout().then(() => {
    //Destroys the session
    props.setUser(null);
  });
};

const Toolbar = props => {
  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo">
          <Link to="/">
            <img className="nav-logo" src="/logo192.png" alt="TabledIn-Logo" />{" "}
            TabledIn
          </Link>
        </div>
        <div className="spacer" />
        <div className="toolbar__navigation-items">
          <ul>
            {props.user ? (
              <>
                <li>
                  <Link to="/planner">Planner</Link>
                </li>
                <li>
                  <Link to="/restaurant/show">Restaurant Info</Link>
                </li>
                <li>
                  <Link
                    className="nav-link__outer"
                    to="/"
                    onClick={() => handleLogout(props)}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
                <li>
                  <Link className="nav-link__outer" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Toolbar;
