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
  showModal = booking => {
    this.setState(state => {
      //check if the id is the same as the one being passed into the function. If yes, show modal. If no, don't show modal.
      const bookings = state.bookings.map((item, j) => {
        if (booking._id === item._id) {
          item.show = !item.show;
          return item;
        } else {
          return item;
        }
      });
      return {
        bookings
      };
    });
  };

  // Function for datepicker
  handleDayClick(day) {
    this.setState({ selectedDay: day });
  }

  //get all bookings
  getData = () => {
    axios
      .get("/api/v2/bookings")
      .then(response => {
        //add show property to bookings
        let bookingsData = response.data.map(el => {
          el.show = false;
          return el;
        });

        this.setState({
          bookings: bookingsData
        });
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  //delete selected booking
  deleteBooking = id => {
    axios.delete(`/api/v2/bookings/${id}`).then(res => {
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

    const bookingItems = filteredBookings.map((booking, index) => {
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
        <div key={booking._id}>
          {booking.visitorname && (
            <div>
              <li className="bookings-list-li">
                <div className="bookings-list-div">
                  <div className="bookings-list-left">
                    <p>{booking.visitorname}</p>
                    <p>Guests: {booking.visitorcount}</p>
                  </div>

                  <div className="bookings-list-middle">
                    <p>{bookingTime}</p>
                    <p>Table {booking.tablenumber}</p>
                  </div>

                  <div className="bookings-list-right">
                    <button
                      className="delete-button delete-booking"
                      onClick={e => {
                        this.showModal(booking);
                      }}
                    >
                      {" "}
                      Delete{" "}
                    </button>
                    {booking.webapp && (
                      <img src="/logo192.png" alt="TabledIn-Logo" />
                    )}
                    {booking.dialogflow && (
                      <img
                        src="/Google_icon_coloured.png"
                        alt="TabledIn-Logo"
                      />
                    )}
                  </div>
                </div>
                <div className="bookings-list-bottom">
                  {booking.visitorphone && <p>{booking.visitorphone} </p>}
                  {booking.visitoremail && <p>{booking.visitoremail} </p>}
                </div>
                <Modal
                  onClose={() => {
                    this.showModal(booking);
                  }}
                  show={booking.show}
                  // deleteBooking={this.deleteBooking}
                  // bookingID={booking._id}
                  onClickFunction={() => {
                    this.deleteBooking(booking._id);
                  }}
                >
                  Are you sure you wish to delete this booking?
                </Modal>
              </li>
            </div>
          )}
        </div>
      );
    });

    return (
      <div className="booking-show-div">
        <div className="booking-show-div-header">
          <h2 className="booking-form-header">Your Bookings</h2>
          <Link to="/booking/add">
            <button className="add-booking-button">Add booking</button>
          </Link>
        </div>

        <div className="booking-show-div-daypicker">
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

        <ul className="booking-show-div-bookings">
          {bookingItems && bookingItems.length ? (
            bookingItems
          ) : (
            <p className="booking-show-div-noBooking">
              No bookings for this date
            </p>
          )}
        </ul>
      </div>
    );
  }
}
