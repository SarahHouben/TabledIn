import React, { Component } from "react";
import { Link } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import axios from "axios";

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
  }

  getData = () => {
    axios
      .get("/api/bookings")
      .then(response => {
        // console.log("RESPONSE: ", response);
        this.setState({
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

  deleteBooking = () => {
    console.log("DELETE BOOKING FUNCTION IS CALLED");
    // const id = booking._id
    // axios.delete(`/api/bookings/${id}`).then(() => {
    //   this.props.history.push("/bookings");
    // })
  };

  render() {
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
      return (
        <ul key={booking._id}>
          <li>
            <section>
              <div>
                <p>Date: {[...booking.date].splice(0, 10).join("")}</p>
                <p>
                  Time:{" "}
                  {booking.timeslot.slice(0, 2) +
                    ":" +
                    booking.timeslot.slice(2)}
                </p>
                <p>Table: {booking.tablenumber}</p>
              </div>
              <div>
                <p>
                  Guest: {booking.visitorname} Amount: {booking.visitorcount}
                </p>
                <p>
                  Contact: {booking.visitorphone} {booking.visitoremail}
                </p>
              </div>
              <div>
                <button>Edit</button>

                <button
                  onClick={e => {
                    if (
                      window.confirm(
                        "Are you sure you wish to delete this booking?"
                      )
                    )
                      this.deleteBooking(e);
                  }}
                >
                  Delete
                </button>

                <button>Delete</button>
              </div>
            </section>
          </li>
        </ul>
      );
    });

    return (
      <div>
        <h3>Your bookings</h3>

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
          <button>Add booking</button>
        </Link>
      </div>
    );
  }
}
