import React, { Component } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import axios from "axios";

export default class BookingForm extends Component {
  // state = {
  //   selectedDay: undefined
  // };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: undefined,
      guestnumber: 0,
      arrivaltime: "",
      name: "",
      phone: "",
      email: ""
    };
  }

  // Function for datepicker
  handleDayClick(day) {
    this.setState({ selectedDay: day });
    // console.log(day);
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
    console.log({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post("/api/bookings", {
        selectedDay: this.state.selectedDay,
        guestnumber: this.state.guestnumber,
        arrivaltime: this.state.arrivaltime,
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email
      })
      .then(() => {
        console.log("created booking step1");
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Make a booking</h1>
        <form onSubmit={this.handleSubmit}>
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

          <div>
            <label htmlFor="guestnumber">Number of guests: </label>
            <input
              type="number"
              name="guestnumber"
              id="guestnumber"
              value={this.state.guestnumber}
              onChange={this.handleChange}
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
              value={this.state.arrivaltime}
              onChange={this.handleChange}
            />
          </div>

          <h3>Guest Details</h3>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label htmlFor="phone">Phone number: </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={this.state.phone}
              onChange={this.handleChange}
            />
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <button type="Submit">submit</button>
        </form>
      </React.Fragment>
    );
  }
}
