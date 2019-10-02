import React, { Component } from "react";
import TimeForm from "./TimeForm";
import axios from "axios";
import TableForm from "./TableForm";

export default class RestaurantForm extends Component {
  render() {
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
              <label htmlFor="">Open? </label>
              <input type="checkbox" name="" id="" />
              {/* //if checkbox is checked, render TimeForm component */}
              <TimeForm />
            </div>
            <div>
              <p>Tuesday</p>
              <label htmlFor="">Open? </label>
              <input type="checkbox" name="" id="" />
              {/* //if checkbox is checked, render TimeForm component */}
              <TimeForm />
            </div>
            <div>
              <p>Wednesday</p>
              <label htmlFor="">Open? </label>
              <input type="checkbox" name="" id="" />
              {/* //if checkbox is checked, render TimeForm component */}
              <TimeForm />
            </div>
            <div>
              <p>Thursday</p>
              <label htmlFor="">Open? </label>
              <input type="checkbox" name="" id="" />
              {/* //if checkbox is checked, render TimeForm component */}
              <TimeForm />
            </div>
            <div>
              <p>Friday</p>
              <label htmlFor="">Open? </label>
              <input type="checkbox" name="" id="" />
              {/* //if checkbox is checked, render TimeForm component */}
              <TimeForm />
            </div>
            <div>
              <p>Saturday</p>
              <label htmlFor="">Open? </label>
              <input type="checkbox" name="" id="" />
              {/* //if checkbox is checked, render TimeForm component */}
              <TimeForm />
            </div>
            <div>
              <p>Sunday</p>
              <label htmlFor="">Open? </label>
              <input type="checkbox" name="" id="" />
              {/* //if checkbox is checked, render TimeForm component */}
              <TimeForm />
            </div>
          </div>

          <label htmlFor="table">Number of tables: </label>
          <input type="number" />
          <button type="submit">Submit table number</button>
          {/* //RENDER  SAME AMOUNT OF TABLEFORMS  AS NUMBER OF TABLES */}
          <TableForm />
        </form>
      </React.Fragment>
    );
  }
}
