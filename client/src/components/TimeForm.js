import React, { Component } from "react";

export default class TimeForm extends Component {
  state = {
    openingtimes: {}
  };

  convertTime = time => {
    let t = time.toString();
    if (t.length === 3) {
      let tEnd = t.slice(t.length - 2);
      let tStart = "0" + t.substr(0, 1) + ":";
      t = tStart + tEnd;
    } else {
      let tEnd = t.slice(t.length - 2);
      let tStart = t.substr(0, 2) + ":";
      t = tStart + tEnd;
    }
    return t;
  };

  componentDidMount() {
    if (this.props.openingtimes) {

      this.setState({
        openingtimes: {
          opentime: this.convertTime(this.props.openingtimes.opentime),
          closetime: this.convertTime(this.props.openingtimes.closetime)
        }
      });
    }
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      openingtimes: { ...this.state.openingtimes, [name]: value }
    });
    this.props.setOpeningTime(name, value, this.props.weekday);
  };

  render() {
    return (
      <div className="time-input">
        <label htmlFor="opentime">Opens:</label>
        <input
          type="time"
          name="opentime"
          id="opentime"
          min="08:00"
          max="23:30"
          step="900"
          required
          value={this.state.openingtimes.opentime}
          onChange={this.handleChange}
        />
        <label htmlFor="closetime">Closes:</label>
        <input
          type="time"
          name="closetime"
          id="closetime"
          min="08:00"
          max="23:30"
          step="900"
          required
          value={this.state.openingtimes.closetime}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
