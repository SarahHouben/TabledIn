import React, { Component } from "react";
import { Link } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import Modal from "./Modal";

import axios from "axios";

export default class Bookings extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: undefined,
      bookings: [],
      show: false
    };
  }

  //function to toggle modal
  showModal = () => {
    this.setState({
      show: !this.state.show
    });
  };

  // Function for datepicker
  handleDayClick(day) {
    this.setState({ selectedDay: day });
  }

  getData = () => {
    axios
      .get("/api/bookings")
      .then(response => {
        this.setState({
          bookings: response.data
        });
      })
      .catch(err => {
        // handle err.response depending on err.response.status
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  deleteBooking = id => {
    axios.delete(`/api/bookings/${id}`).then(res => {
      // console.log(res);
      this.getData();
    });
  };

  render() {
    //get default Date
    let defaultYear = new Date().getFullYear();
    let defaultYearString = defaultYear.toString();
    let defaultYearMonth = "";

    let defaultMonth = new Date().getMonth() + 1; //plus one as getMonth starts with index 0
    let defaultMonthString = defaultMonth.toString();
    if (defaultMonthString.length === 1) {
      defaultYearMonth = defaultYearString.concat("-0", defaultMonthString);
    } else {
      defaultYearMonth = defaultYearString.concat("-", defaultMonthString);
    }

    let defaultDay = new Date().getDate();
    let defaultDayString = defaultDay.toString();
    let defaultDate = "";

    if (defaultDayString.length === 1) {
      defaultDate = defaultYearMonth.concat("-0", defaultDayString);
    } else {
      defaultDate = defaultYearMonth.concat("-", defaultDayString);
    }

    //get date selected in calender
    let calenderString = "";
    const calenderObject = JSON.stringify(this.state.selectedDay) || null;
    if (calenderObject !== null) {
      calenderString = [...calenderObject].splice(1, 10).join("");
    } else {
      calenderString = null;
    }

    //set selected Date to have the default value of the current date. On picking a date in the calender, date changes to the calender date
    const selectedDate = calenderString || defaultDate;

    //filter Bookings and only return bookings with the correct date
    const filteredBookings = this.state.bookings.filter(booking => {
      let bookingDate = [...booking.date].splice(0, 10).join("");
      let dateMatched = bookingDate === selectedDate;
      return dateMatched;
    });

    const bookingItems = filteredBookings.map(booking => {
      //format time for displaying
      let hours = "";
      let minutes = "";
      if (booking.timeslot.length === 3) {
        hours = "0" + booking.timeslot.slice(0, 1);
        minutes = booking.timeslot.slice(1);
      }
      if (booking.timeslot.length === 4) {
        hours = booking.timeslot.slice(0, 2);
        minutes = booking.timeslot.slice(2);
      }

      let bookingTime = hours + ":" + minutes;

      return (
        <ul key={booking._id}>
          <li>
            <section>
              <div>
                <p>Date: {[...booking.date].splice(0, 10).join("")}</p>
                <p>Time: {bookingTime}</p>
                <p>Table: {booking.tablenumber}</p>
              </div>
              <div>
                <p>
                  Guest: {booking.visitorname} Amount: {booking.visitorcount}
                </p>
                {booking.visitoremail && <p>Email: {booking.visitoremail} </p>}
                {booking.visitorphone && <p>Phone: {booking.visitorphone} </p>}
              </div>

              <div>
                <button
                  className="delete-button"
                  onClick={e => {
                    this.showModal();
                  }}
                >
                  {" "}
                  Delete{" "}
                </button>
              </div>
            </section>
          </li>
          <Modal
            onClose={this.showModal}
            show={this.state.show}
            deleteBooking={this.deleteBooking}
            bookingID={booking._id}
            onClickFunction={() => {
              this.deleteBooking(booking._id);
            }}
          >
            Are you sure you wish to delete this booking?
          </Modal>
        </ul>
      );
    });

    return (
      <div>
        {/* <h3>Your bookings</h3> */}
        <h2 className="rest-form-header">Your Bookings</h2>

        <div>
          {this.state.selectedDay ? (
            <p>Bookings for: {this.state.selectedDay.toDateString()}</p>
          ) : (
            <p>Please select a day.</p>
          )}
          <DayPicker
            onDayClick={this.handleDayClick}
            selectedDays={this.state.selectedDay}
          />
        </div>

        <div>
          {bookingItems && bookingItems.length ? (
            bookingItems
          ) : (
            <p>No bookings for this date</p>
          )}
        </div>

        <Link to="/booking/add">
          <button className="edit-button">Add booking</button>
        </Link>
      </div>
    );
  }
}
