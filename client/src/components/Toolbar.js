import React from "react";
import { NavLink } from "react-router-dom";
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

        <NavLink className="toolbar__logo" to="/">
          <img className="nav-logo" src="/logo192.png" alt="TabledIn-Logo" />{" "}
          TabledIn
        </NavLink>

        <div className="spacer" />
        <div className="toolbar__navigation-items">
          <ul>
            {props.user ? (
              <>
                <li>
                  <NavLink
                    className="navlink-style"
                    activeClassName="navlink-active"
                    to="/booking/add"
                  >
                    Add Booking
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="navlink-style"
                    activeClassName="navlink-active"
                    to="/planner"
                  >
                    Planner
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="navlink-style"
                    activeClassName="navlink-active"
                    to="/restaurant/show"
                  >
                    Restaurant Info
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link__outer-logout"
                    to="/"
                    onClick={() => handleLogout(props)}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    className="navlink-style"
                    activeClassName="navlink-active"
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="navlink-active"
                    className="nav-link__outer navlink-style"
                    to="/login"
                  >
                    Login
                  </NavLink>
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
