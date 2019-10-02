import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/api";

//Logout function
const handleLogout = props => {
  //logs user out
  logout().then(() => {
    //Destroys the session
    props.setUser(null);
  });
};

const Navbar = props => {
  // console.log("NAVBAR PROPS: ", props);
  return (
    <nav>
      {/* //LATER IMPLEMENT CONDITIONAL RENDERING WHEN ALL COMPONENTS AND LINKS HAVE BEEN ADDED TO NAV */}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {props.user ? (
          <>
            <li>
              <Link to="/" onClick={() => handleLogout(props)}>
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
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
