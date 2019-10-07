import React, { Component } from "react";
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
      closetime: ""
    };
  }
  //get values from text inputs and update state of weekday, opentime, closetime
  handleDayClick(day) {
    this.setState({ selectedDay: day });
  }
  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  //get values from checkbox and update state of "open"
  handleCheckboxChange = event => {
    const check = event.target.checked;

    this.setState({ open: check });
  };

  //Function to be called when submitting the form
  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("/api/planner/edit", {
        selectedDay: this.state.selectedDay,
        open: this.state.open,
        opentime: this.state.opentime,
        closetime: this.state.closetime
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <h2 className="rest-form-header">Add new Schedule</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <DayPicker
              onDayClick={this.handleDayClick}
              selectedDays={this.state.selectedDay}
            />

            <label htmlFor="open">Open? </label>
            <input
              type="checkbox"
              name="open"
              id="open"
              checked={this.state.open}
              onChange={this.handleCheckboxChange}
            />
          </div>

          {this.state.open && (
            <div>
              <label htmlFor="opentime">Opening time: </label>
              <input
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
              <label htmlFor="closetime">Closing time: </label>
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

          <button className="edit-button" type="submit">Submit</button>
        </form>
      </React.Fragment>
    );
  }
}
