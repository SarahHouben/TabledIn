import React, { Component } from "react";
import { Link } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import axios from "axios";

export default class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: undefined,
      guestnumber: 0,
      arrivaltime: "",
      name: "",
      phone: "",
      email: "",
      message: "",
      success: "",
      dialogflow: false,
      webapp: false
    };
  }

  // Function for datepicker
  handleDayClick(day) {
    this.setState({ selectedDay: day });
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
    // console.log({
    //   [name]: value
    // });
  };

  //Handle Submit with message functionality
  handleSubmit = event => {
    event.preventDefault();

    let success = "Created booking.";

    axios
      .post("/api/v2/bookings", {
        selectedDay: this.state.selectedDay,
        guestnumber: this.state.guestnumber,
        arrivaltime: this.state.arrivaltime,
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        dialogflow: false,
        webapp: true
      })
      .then(data => {
        if (data.data.message) {
          this.setState({
            message: data.data.message,
            success: ""
          });
        } else if (!data.data.message) {
          this.setState({
            success: success,
            message: "",
            selectedDay: undefined,
            guestnumber: 0,
            arrivaltime: "",
            name: "",
            phone: "",
            email: "",
            dialogflow: false,
            webapp: false
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <h2 className="rest-form-header">Add a Booking</h2>

        <form onSubmit={this.handleSubmit} className="booking-form-form">
          <h3 className="booking-form-daypicker-header">Booking Details</h3>

          <div className="booking-form-div-daypicker">
            {this.state.selectedDay ? (
              <p>Date of booking: {this.state.selectedDay.toDateString()}</p>
            ) : (
              <p>Please select a day.</p>
            )}
            <DayPicker
              onDayClick={this.handleDayClick}
              selectedDays={this.state.selectedDay}
            />
          </div>

          <div className="booking-form-div-guestinfo">
            <div>
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

            <div className="booking-form-guests">
              <label htmlFor="guestnumber">Guests: </label>
              <input
                type="number"
                name="guestnumber"
                id="guestnumber"
                value={this.state.guestnumber}
                onChange={this.handleChange}
                min="1"
              />
            </div>
          </div>

          <h3 className="booking-form-guest-header">Guest Details</h3>
          <div className="booking-form-div-guestdetails">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              required
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
          {this.state.message && (
            <p className="auth-message">
              {this.state.message} <Link to="/">Or go back to home.</Link>
            </p>
          )}
          {this.state.success && (
            <p className="success-message">
              {this.state.success} <Link to="/">Back to home.</Link>
            </p>
          )}

          <button className="edit-button" type="Submit">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
