import React, { Component } from "react";

export default class TimeForm extends Component {
  handleChange = event => {
    const { name, value } = event.target;
    // console.log("val", name, value);
    this.props.setOpeningTime(name, value, this.props.weekday);
  };

  render() {
    return (
      <>
        <label htmlFor="opentime">Opening time: </label>
        <input
          type="time"
          name="opentime"
          id="opentime"
          min="08:00"
          max="23:30"
          step="900"
          required
          // value={this.state.opentime}
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
          // value={this.state.closetime}
          onChange={this.handleChange}
        />
      </>
    );
  }
}
