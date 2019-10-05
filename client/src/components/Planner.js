import React, { Component } from "react";
import { Link } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import axios from "axios";

export default class EditPlanner extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.editSchedule = this.editSchedule.bind(this);
    this.state = {
      selectedDay: undefined,
      open: false,
      message: "",
      openingtime: "",
      closingtime: "",
      _id: ""
    };
  }
editSchedule() {
  
  // console.log(this.state.selectedDay)
  axios.delete("/api/planner", { data: { selectedDay : this.state.selectedDay } }).then(res =>{
    // console.log('fired' res)

  }).catch(err => {
    console.log(err);
  })
  }



  // Function for datepicker
  handleDayClick(day) {
    this.setState({ selectedDay: day });
// console.log(this.state.selectedDay)
    axios
      .post("/api/planner", {
        selectedDay: day
      })
      .then(response => {
        // console.log(response);
        if (response.data.message) {
          this.setState({
            message: response.data.message,
            open: false,
            openingtime: "",
            closingtime: "",
            _id: ""
          });
        } else {
          this.setState({
            open: response.data.open,
            openingtime: response.data.openingtime,
            closingtime: response.data.closingtime,
            _id: response.data._id,
            message: ""
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    //format openingtime for displaying
    let hours = "";
    let minutes = "";
    let openString = this.state.openingtime.toString();

    if (openString.length === 3) {
      hours = openString.slice(0, 1);
      minutes = openString.slice(1);
    }
    if (openString.length === 4) {
      hours = openString.slice(0, 2);
      minutes = openString.slice(2);
    }

    let openingTime = hours + ":" + minutes;

    //format closingtime for displaying
    let closehours = "";
    let closeminutes = "";
    let closeString = this.state.closingtime.toString();

    if (closeString.length === 3) {
      closehours = closeString.slice(0, 1);
      closeminutes = closeString.slice(1);
    }
    if (closeString.length === 4) {
      closehours = closeString.slice(0, 2);
      closeminutes = closeString.slice(2);
    }

    let closingTime = closehours + ":" + closeminutes;

    return (
      <React.Fragment>
        <h3>Search for Schedules</h3>

        <div>
          {this.state.selectedDay ? (
            <p>Schedule for: {this.state.selectedDay.toDateString()}</p>
          ) : (
            <p>Please select a day.</p>
          )}
          <DayPicker
            onDayClick={this.handleDayClick}
            selectedDays={this.state.selectedDay}
          />
        </div>

        {this.state._id ? (
          <div>
            {this.state.open ? <p>Open</p> : <p>Closed</p>}
            {this.state.open && <p>Opening time: {openingTime}</p>}
            {this.state.open && <p>Closing time: {closingTime}</p>}
          </div>
        ) : (
          <p>No schedule found.</p>
        )}

        {this.state._id ? (
          <Link to="/planner/edit">
            <button onClick= {this.editSchedule}>Edit schedule</button>
          </Link>
        ) : (
          <Link to="/planner/edit">
            <button>Add schedule</button>
          </Link>
        )}
      </React.Fragment>
    );
  }
}
