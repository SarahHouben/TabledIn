import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class ShowRestaurant extends Component {
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
    tables: [],
    openingtimes: {
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
      sunday: {}
    }
  };

  getData = () => {
    axios
      .get("/api/restaurants")
      .then(response => {
        console.log(response);
        this.setState({
          name: response.data.name,
          address: response.data.address,
          phone: response.data.phone,
          email: response.data.email,
          weekdays: response.data.weekdays,
          tablenumber: response.data.tablenumber,
          tables: response.data.tables,
          openingtimes: response.data.openingtimes
        });
      })
      .catch(err => {
        console.log(err.response);
        // handle err.response depending on err.response.status
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    return (
      <div>
        <h1>Information for {this.state.name}</h1>

        <h4>Contact details</h4>
        <p>Email: {this.state.email}</p>
        <p>Phone: {this.state.phone}</p>
        <p>Address: {this.state.address}</p>

        <Link to="/restaurant/edit">
          <button>Edit information</button>
        </Link>
      </div>
    );
  }
}
