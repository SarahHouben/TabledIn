import React, { Component } from "react";

export default class TimeForm extends Component {
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
        />
      </>
    );
  }
}
