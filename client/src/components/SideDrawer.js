import React from "react";
import { Link } from "react-router-dom";
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
              <Link to="/booking/add" onClick={props.click}>
                Add Booking
              </Link>
            </li>
            <li>
              <Link to="/planner" onClick={props.click}>
                Planner
              </Link>
            </li>
            <li>
              <Link to="/restaurant/show" onClick={props.click}>
                Restaurant Info
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => handleLogout(props)}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup" onClick={props.click}>
                Signup
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={props.click}>
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default SideDrawer;
