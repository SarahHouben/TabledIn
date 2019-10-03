import React, { Component } from "react";

export default class BookingForm extends Component {
  render() {
    return (
      <React.Fragment>
        <form>
          <h3>Booking Details</h3>
          <p>IMPLEMENT DATE PICKER HERE</p>
          <div>
            <label htmlFor="guestnumber">Number of guests: </label>
            <input
              type="number"
              name="guestnumber"
              id="guestnumber"
              // value={this.state.guestnumber}
              // onChange={this.handleChange}
              min="0"
            />
            {/* <label htmlFor="arrivaltime">Time: </label>
            <input
              type="time"
              name="arrivaltime"
              id="arrivaltime"
              min="08:00"
              max="23:30"
              step="900"
              required
              // value={this.state.arrivaltime}
              // onChange={this.handleChange}
            /> */}
          </div>

          <h3>Guest Details</h3>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              // value={this.state.name}
              // onChange={this.handleChange}
            />
            <label htmlFor="phone">Phone number: </label>
            <input
              type="text"
              name="phone"
              id="phone"
              // value={this.state.phone}
              // onChange={this.handleChange}
            />
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              id="email"
              // value={this.state.email}
              // onChange={this.handleChange}
            />
          </div>

          <button type="submit"></button>
        </form>
      </React.Fragment>
    );
  }
}
