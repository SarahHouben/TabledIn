import React, { Component } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

export default class BookingForm extends Component {

state = {
  selectedDay: undefined
}

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: undefined
    };
  }

//   handleDayClick = event => {
// const day = event.target.day
//     this.setState({ selectedDay: day });
//   }

  // Function for datepicker
  handleDayClick(day) {
    this.setState({ selectedDay: day });
    console.log(day);
  }

  render() {
    return (
      <React.Fragment>
        <h1>Make a booking</h1>
        <form>
          <h3>Booking Details</h3>

          <div>
            {this.state.selectedDay ? (
              <p>
                Date of booking: {this.state.selectedDay.toLocaleDateString()}
              </p>
            ) : (
              <p>Please select a day.</p>
            )}
            <DayPicker
              onDayClick={this.handleDayClick}
              selectedDays={this.state.selectedDay}
            />
          </div>

          {/* <label htmlFor="">Select date:</label>
          <DayPicker /> */}

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
            <label htmlFor="arrivaltime">Time: </label>
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
            />
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
