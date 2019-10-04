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

  render() {
    //get default Date (current date)
    let defaultYear = new Date().getFullYear();
    let defaultYearString = defaultYear.toString();
    let defaultYearMonth = "";

    let defaultMonth = new Date().getMonth();
    let defaultMonthString = defaultMonth.toString();
    if (defaultMonthString.length === 1) {
      defaultYearMonth = defaultYearString.concat("-0", defaultMonthString);
    } else {
      defaultYearMonth = defaultYearString.concat("-", defaultMonthString);
    }

    let defaultDay = new Date().getDay();
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

    const filteredBookings = this.state.bookings.filter(booking => {
      let bookingDate = [...booking.date].splice(0, 10).join("");

      let dateMatched = bookingDate === selectedDate;

      console.log("booking Date: ", bookingDate);
      console.log("selected Date: ", calenderString);
      console.log("Default: ", defaultDate);

      // console.log(dateMatched);
      return dateMatched;
    });

    //const bookings = this.state.bookings;
    const bookingItems = filteredBookings.map(booking => {
      return (
        <ul key={booking._id}>
          <li>
            <section>
              <div>
                <p>Date: {[...booking.date].splice(0, 10).join("")}</p>

                <p>Time: REPLACE LATER</p>
                {/* <p>Time: {booking.timeslot}</p> */}
                <p>Table: REPLACE LATER</p>
                {/* <p>Table: {booking.tablenumber}</p> */}
              </div>
              <div>
                <p>
                  Guest: {booking.visitorname} Amount: {booking.visitorcount}
                </p>
                <p>
                  Contact: {booking.visitorphone}, {booking.visitoremail}
                </p>
              </div>
              <div>
                <button>Edit</button>
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
            <p>Bookings for: {this.state.selectedDay.toLocaleDateString()}</p>
          ) : (
            <p>Please select a day.</p>
          )}
          <DayPicker
            onDayClick={this.handleDayClick}
            selectedDays={this.state.selectedDay}
          />
        </div>

        <div>{bookingItems}</div>

        <Link to="/addbooking">
          <button>Add booking</button>
        </Link>
      </div>
    );
  }
}

// const express = require("express");
// const router = express.Router();
// const Booking = require("../models/Booking");
// const DayReport = require("../models/DayReport");
// const { Restaurant } = require("../models/Restaurant");
// const Table = require("../models/Table");
// // POST /api/bookings
// // create a new `booking` resource
// router.post("/", (req, res) => {
//   const selectedDay = req.body.selectedDay;
//   const guestnumber = req.body.guestnumber;
//   const arrivaltime = req.body.arrivaltime;
//   const name = req.body.name;
//   const phone = req.body.phone;
//   const email = req.body.email;
//   const owner = req.user._id;
//   const dayIndex = new Date(selectedDay).getDay()
//   function getWeekDay(date) {
//     //Create an array containing each day, starting with Sunday.
//     var weekdays = new Array(
//       "Sunday",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday"
//       );

//     //Return the element that corresponds to that index.
//     return weekdays[dayIndex].toLowerCase();
//   }
//   const day = getWeekDay(selectedDay);
//   console.log(dayIndex);
//   //Finding users restaurant
//   Restaurant.findOne(
//     { owner: owner },
//     { tables: 1, timeslots: 1, weekdays: 1 }
//   ).then(restaurant => {
//     //Checking if there is day report for specific restaurant and creating dayreport if there is none
//     // console.log(restaurant.weekdays);
//     DayReport.find({
//       $and: [{ date: selectedDay }, { restaurant: restaurant._id }],
//     }).then(find => {
//       console.log(find)
//       if (find.length !== 0) {
//         // console.log(find._id)
//          Table.find({
//           $and: [{dayreport:find._id},{date:selectedDay}]}
//          ).then(tables =>{
//           //  console.log(tables);
//          })
//       } else {
//             // console.log(restaurant.weekdays)
//          if(restaurant.weekdays[day]){
//            DayReport.create({
//              restaurant: restaurant._id,
//              date: selectedDay,
//              timeslots: restaurant.timeslots,
//              weekdays: restaurant.weekdays,
//              tables: restaurant.tables
//            }).then(dayReport => {
//              dayReport.tables.map(el => {
//                Table.create({
//                  dayreport: dayReport._id,
//                  tablecapacity: el.cap,
//                  tablenumber: el.num,
//                  timeslots: dayReport.timeslots[dayIndex].timeslots,
//                  date: dayReport.date,
//                });
//              });
//            });
//           } else {
//         // res.json({message:'The restaurant is closed on that date'})
//         }

//       }
//     });
//     //CHECK BOOKING AVAILABILITY FUNCTION
//     //check whether there is a DayReport for that date
//     //NO: 1. Create DayReport for the date with default opening times and timeslots from Restaurant document
//     //       2. DayReport creates Table documents with default availability for that date.
//     //       3. Check in DayReport whether restaurant is open on that date (check if day in "weekdays" is true (open) or false (closed))
//     //              4A. If Restaurant is closed on that day => Send message to be rendered under form: "Closed on this day. Pick another date"
//     //               4B. If Restaurant is open on that day =>  Check Table documents for that day.  See if tables have available timeslot for that time with the correct capacity
//     //                            5A. If no capacity on either table during that timeslot =>  Send message to be rendered under form: "No free tables. Pick another time."
//     //                            5B. If there is a matching table for that timeslot => Send message "Booking confirmed. Table number is: {tablenumber}" && CREATE BOOKING with correct data
//     // YES: same as above starting from 3.
//   });
//   //CHECK BOOKING AVAILABILITY FUNCTION
//   //check whether there is a DayReport for that date
//   //NO: 1. Create DayReport for the date with default opening times and timeslots from Restaurant document
//   //       2. DayReport creates Table documents with default availability for that date.
//   //       3. Check in DayReport whether restaurant is open on that date (check if day in "weekdays" is true (open) or false (closed))
//   //              4A. If Restaurant is closed on that day => Send message to be rendered under form: "Closed on this day. Pick another date"
//   //               4B. If Restaurant is open on that day =>  Check Table documents for that day.  See if tables have available timeslot for that time with the correct capacity
//   //                            5A. If no capacity on either table during that timeslot =>  Send message to be rendered under form: "No free tables. Pick another time."
//   //                            5B. If there is a matching table for that timeslot => Send message "Booking confirmed. Table number is: {tablenumber}" && CREATE BOOKING with correct data
//   // YES: same as above starting from 3.
//   Booking.create({
//     date: selectedDay,
//     visitorcount: guestnumber,
//     visitorname: name,
//     visitorphone: phone,
//     visitoremail: email,
//     //     timeslot: timeslot,
//     // tablenumber: tablenumber,
//   })
//     .then(booking => {
//       res.json(booking);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });
// module.exports = router;
