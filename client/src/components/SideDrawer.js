import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../services/api";

//Logout function
const handleLogout = props => {
  //logs user out
  logout().then(() => {
    //Destroys the session
    props.setUser(null);
    props.click();
  });
};

const SideDrawer = props => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }

  return (
    <nav className={drawerClasses}>
      <ul>
        {props.user ? (
          <>
            <li>
              <NavLink
                className="side-drawer-navlink"
                activeClassName="side-drawer-navlink-active"
                to="/booking/add"
                onClick={props.click}
              >
                Add Booking
              </NavLink>
            </li>
            <li>
              <NavLink
                className="side-drawer-navlink"
                activeClassName="side-drawer-navlink-active"
                to="/planner"
                onClick={props.click}
              >
                Planner
              </NavLink>
            </li>
            <li>
              <NavLink
                className="side-drawer-navlink"
                activeClassName="side-drawer-navlink-active"
                to="/restaurant/show"
                onClick={props.click}
              >
                Restaurant Info
              </NavLink>
            </li>
            <li>
              <NavLink
                className="side-drawer-navlink"
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
                className="side-drawer-navlink"
                activeClassName="side-drawer-navlink-active"
                to="/signup"
                onClick={props.click}
              >
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink
                className="side-drawer-navlink"
                activeClassName="side-drawer-navlink-active"
                to="/login"
                onClick={props.click}
              >
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default SideDrawer;
