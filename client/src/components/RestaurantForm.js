import React, { Component } from "react";
import TimeForm from "./TimeForm";
import axios from "axios";
import TableForm from "./TableForm";

export default class RestaurantForm extends Component {
  state = {
    name: "",
    address: "",
    phone: "",
    email: "",
    weekdays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    tablenumber: 0,
    tables: [{ tablenumber: "", tablecapacity: 0 }]
  };

  handleChange = event => {
    // const { name, value, checked } = event.target;

    const result =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState({
      weekdays: { [name]: result },
      tablenumber: value
    });
  };

  testFunct = (cap, num) => {
    const tablecapacity = cap;
    const tablenumber = num;

    this.setState({
      tables: [{ tablenumber: num, tablecapacity: cap }]
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    // console.log(this.state.weekdays.monday);
    return (
      <React.Fragment>
        <form action="">
          <label htmlFor="name">Restaurant name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="address">Address: </label>
          <input
            type="text"
            name="address"
            id="address"
            value={this.state.address}
            onChange={this.handleChange}
          />
          <label htmlFor="phone">Phone number: </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={this.state.phone}
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            id="email"
            id="phone"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="">Opening times: </label>
          <div>
            <div>
              <p>Monday</p>
              <label htmlFor="monday">Open? </label>
              <input
                type="checkbox"
                name="monday"
                id="monday"
                checked={this.state.weekdays.monday}
                onChange={this.handleChange}
              />
              {/* //if checkbox is checked, render TimeForm component */}
              {this.state.weekdays.monday && <TimeForm />}
            </div>
            <div>
              <p>Tuesday</p>
              <label htmlFor="tuesday">Open? </label>
              <input type="checkbox" name="tuesday" id="tuesday" />
              {/* //if checkbox is checked, render TimeForm component */}
              <TimeForm />
            </div>
            <div>
              <p>Wednesday</p>
              <label htmlFor="wednesday">Open? </label>
              <input type="checkbox" name="wednesday" id="wednesday" />
              {/* //if checkbox is checked, render TimeForm component */}
              <TimeForm />
            </div>
            <div>
              <p>Thursday</p>
              <label htmlFor="thursday">Open? </label>
              <input type="checkbox" name="thursday" id="thursday" />
              {/* //if checkbox is checked, render TimeForm component */}
              <TimeForm />
            </div>
            <div>
              <p>Friday</p>
              <label htmlFor="friday">Open? </label>
              <input type="checkbox" name="friday" id="friday" />
              {/* //if checkbox is checked, render TimeForm component */}
              <TimeForm />
            </div>
            <div>
              <p>Saturday</p>
              <label htmlFor="saturday">Open? </label>
              <input type="checkbox" name="saturday" id="saturday" />
              {/* //if checkbox is checked, render TimeForm component */}
              <TimeForm />
            </div>
            <div>
              <p>Sunday</p>
              <label htmlFor="sunday">Open? </label>
              <input type="checkbox" name="sunday" id="sunday" />
              {/* //if checkbox is checked, render TimeForm component */}
              <TimeForm />
            </div>
          </div>

          <label htmlFor="tablenumber">Number of tables: </label>
          <input
            type="number"
            name="tablenumber"
            id="tablenumber"
            value={this.state.tablenumber}
            onChange={this.handleChange}
            min="0"
          />
          {/* //RENDER  SAME AMOUNT OF TABLEFORMS  AS NUMBER OF TABLES */}
          {/* {<TimeForm test={(x,y)=>testFunct(x,y)}/>} */}
          <TableForm
            tableNb={this.state.tablenumber}
            test={(cap, num) => testFunct(cap, num)}
          />
        </form>
        <button type="submit">Submit your Restaurant</button>
      </React.Fragment>
    );
  }
}
