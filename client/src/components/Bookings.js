import React, { Component } from "react";
import { Link } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import axios from "axios";
import uuidv4 from "uuid/v4";

export default class Bookings extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: undefined,
      bookings: []
    };
  }

  // Function for datepicker
  handleDayClick(day) {
    this.setState({ selectedDay: day });
    // console.log(day);
    // console.log(this.props);
  }

  getData = () => {
    axios
      .get("/api/bookings")
      .then(response => {
        console.log("RESPONSE: ", response);
        this.setState({
          // date: response.data.date,
          // timeslot: response.data.timeslot,
          // tablenumber: response.data.tablenumber,
          // visitorname: response.data.visitorname,
          // visitorcount: response.data.visitorcount,
          // visitorphone: response.data.visitorphone,
          // visitoremail: response.data.visitoremail,
          bookings: response.data
        });
      })
      .catch(err => {
        console.log(err);
        // handle err.response depending on err.response.status
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    const bookings = this.state.bookings;
    // console.log(this.state)
    const bookingItems = bookings.map(booking => {
      const id = uuidv4();

      return (
        <ul key={id}>
          <li>
            <div>{booking.visitorname}</div>
          </li>
        </ul>
      );
    });

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
          {bookingItems}
          {/* <ul>
            <li>BOOKING</li>
            <li>BOOKING</li>
          </ul> */}
        </div>

        <Link to="/addbooking">
          <button>Add booking</button>
        </Link>
      </div>
    );
  }
}
