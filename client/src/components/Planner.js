import React, { Component } from "react";
import { Link } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
// import axios from "axios";

export default class EditPlanner extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: undefined
      //ADD ANY OTHER INITIAL STATES HERE
    };
  }

  // Function for datepicker
  handleDayClick(day) {
    this.setState({ selectedDay: day });
  }

  //USE THIS FOR THE AXIOS ROUTE TO GET THE DATA FOR THE SCHEDULES IF YOU WANT
  // getData = () => {
  //   axios
  //     .get("/api/planner")
  //     .then(response => {
  //        console.log("RESPONSE: ", response);
  //       this.setState({
  //         dayreport: response.data
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       // handle err.response depending on err.response.status
  //       if (err.response.status === 404) {
  //         this.setState({ error: "Not found" });
  //       }
  //     });
  // };

  // componentDidMount = () => {
  //   this.getData();
  // };



  render() {
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

        
        <Link to="/planner/edit">
          <button>Add schedule</button>
        </Link>
        <Link to="/planner/edit">
          <button>Edit schedule</button>
        </Link>
      </React.Fragment>
    );
  }
}
