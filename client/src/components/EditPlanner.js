import React, { Component } from "react";
import { Link } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import axios from "axios";

export default class EditPlanner extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: undefined,
      open: false,
      opentime: "",
      closetime: "",
      success: ""
    };
  }
  //get values from text inputs and update state of weekday, opentime, closetime
  handleDayClick(day) {
    this.props.changeDate(day);
    this.setState({ success: "" });
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  //get values from checkbox and update state of "open"
  handleCheckboxChange = event => {
    this.setState({ open: !this.state.open });
  };

  //Function to be called when submitting the form
  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    // console.log("PROPS SELECTED DAY: ", this.props.selectedDay);
    let success = "Created schedule.";

    axios
      .post("/api/v2/planner/edit", {
        selectedDay: this.props.selectedDay,
        open: this.state.open,
        opentime: this.state.opentime,
        closetime: this.state.closetime
      })
      .then(res => {
        if (res.data.message) {
          this.setState({
            message: res.data.message,
            success: ""
          });
        } else if (!res.data.message) {
          this.setState({
            success: success,
            message: "",
            selectedDay: undefined,
            open: false,
            opentime: "",
            closetime: ""
          });
        }
        this.props.onDateChange();
      })

      .catch(err => {
        console.log(err);
      });
  };

  render() {
    // console.log(this.props);
    return (
      <React.Fragment>
        <h2 className="rest-form-header">Add new Schedule</h2>
        <form onSubmit={this.handleSubmit} className="booking-form-form">
          <div className="booking-form-div-daypicker">
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

          <div className="schedule-time-div">
            <div className="schedule-form-checkbox-div">
              <label htmlFor="open">Open</label>
              <input
                className="schedule-form-input-open"
                type="checkbox"
                name="open"
                id="open"
                checked={this.state.open}
                onChange={this.handleCheckboxChange}
              />

              <label htmlFor="open">Closed</label>
              <input
                type="checkbox"
                name="open"
                id="open"
                checked={!this.state.open}
                onChange={this.handleCheckboxChange}
              />
            </div>

            {this.state.open && (
              <div>
                <label htmlFor="opentime">Opens: </label>
                <input
                  className="schedule-form-time-open"
                  type="time"
                  name="opentime"
                  id="opentime"
                  min="08:00"
                  max="23:30"
                  step="900"
                  required
                  value={this.state.opentime}
                  onChange={this.handleChange}
                />
                <label htmlFor="closetime">Closes: </label>
                <input
                  type="time"
                  name="closetime"
                  id="closetime"
                  min="08:00"
                  max="23:30"
                  step="900"
                  required
                  value={this.state.closetime}
                  onChange={this.handleChange}
                />
              </div>
            )}

            {this.state.message && (
              <p className="auth-message">{this.state.message}</p>
            )}
            {this.state.success && (
              <p className="success-message">
                {this.state.success} <Link to="/planner">Back to Planner.</Link>
              </p>
            )}
          </div>

          <button className="edit-button" type="submit">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
