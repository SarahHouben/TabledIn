import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Bookings extends Component {
  render() {
    // console.log(this.props)
    return (
      <div>
        <h3>Display list of bookings here</h3>

        <Link to="/addbooking">
          <button>Add booking</button>
        </Link>
      </div>
    );
  }
}
