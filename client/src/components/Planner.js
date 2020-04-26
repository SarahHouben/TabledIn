import React, { Component } from "react";
import { Link } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import Modal from "./Modal";
import axios from "axios";


export default class EditPlanner extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    //this.editSchedule = this.editSchedule.bind(this);
    this.state = {
      selectedDay: undefined,
      open: false,
      message: "",
      openingtime: "",
      closingtime: "",
      _id: "",
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
    this.props.changeDate(day);
    // console.log(this.state.selectedDay)
    axios
      .post("/api/v2/planner", {
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
      hours = "0" + openString.slice(0, 1);
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
      <div className="booking-show-div planner-overall">
        <h2 className="rest-form-header">Search for Schedule</h2>

        <div className="booking-show-div-daypicker">
          {this.props.selectedDay ? (
            <p>Schedule for: {this.props.selectedDay.toDateString()}</p>
          ) : (
            <p>Please select a day.</p>
          )}
          <DayPicker
            onDayClick={this.handleDayClick}
            selectedDays={this.props.selectedDay}
          />
        </div>

        {this.state._id ? (
          <div className="schedule-message-div">
            {this.state.open ? <p className="schedule-message-top">Open</p> : <p className="schedule-message-top">Closed</p>}
            {this.state.open && <p>{openingTime} - {closingTime}</p>}
          </div>
        ) : (
          <div className="no-schedule-message-div">
          <p className="no-schedule-message-p">No schedule found.</p>
          </div>
        )}

        {this.state._id ? (
          <div>
            <button
              className="edit-button edit-schedule-button"
              onClick={e => {
                this.showModal();
              }}
            >
              Change schedule
            </button>

            <Modal
              onClose={this.showModal}
              show={this.state.show}
              deleteSchedule={this.editSchedule}
              onClickFunction={() => {
                this.props.editSchedule(this.props);
              }}
            >
              Changing the schedule will delete all previous bookings for this
              date. Proceed?
            </Modal>
          </div>
        ) : (
          <Link to="/planner/edit">
            <button className="add-schedule-button">Add schedule</button>
          </Link>
        )}
      </div>
    );
  }
}
