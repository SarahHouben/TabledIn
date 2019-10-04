import React, { Component } from "react";
import { Link } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

export default class Bookings extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: undefined
    };
  }

  // Function for datepicker
  handleDayClick(day) {
    this.setState({ selectedDay: day });
    console.log(day);
    console.log(this.props);
  }
  render() {
    // console.log(this.props)
    return (
      <div>
        <h3>Your bookings</h3>

        <div>
          {this.state.selectedDay ? (
            <p>Bookings for: {this.state.selectedDay.toLocaleDateString()}</p>
          ) : (
            <p>Please select a day.</p>
          )}
          <DayPicker
            onDayClick={this.handleDayClick}
            selectedDays={this.state.selectedDay}
          />
        </div>

        <div>
          <p>List of bookings which can be filtered according to date</p>
        </div>

        <Link to="/addbooking">
          <button>Add booking</button>
        </Link>
      </div>
    );
  }
}
