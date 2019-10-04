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
        if (response) {
          this.setState({
            name: response.data.name,
            address: response.data.address,
            phone: response.data.phone,
            email: response.data.email,
            weekdays: response.data.weekdays,
            tablenumber: response.data.tablenumber,
            tables: response.data.tables,
            openingtimes: response.data.openingtime
          });
        }
      })
      .catch(err => {
        console.log(err);
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

        <h4>Opening times</h4>
        <ul>
          <li>Monday:</li>
          {this.state.weekdays.monday && <p>Open</p>}
          {!this.state.weekdays.monday && <p>Closed</p>}

          <li>Tuesday</li>
          {this.state.weekdays.tuesday && <p>Open</p>}
          {!this.state.weekdays.tuesday && <p>Closed</p>}
          {/* {this.state.weekdays.tuesday && <p>Opens: {this.state.openingtimes.tuesday.opentime}</p>} */}
          {/* <p>Opens: {this.state.openingtimes.tuesday}</p> */}
          {this.state.weekdays.tuesday && <p>Closes: </p>}

          <li>Wednesday</li>
          {this.state.weekdays.wednesday && <p>Open</p>}
          {!this.state.weekdays.wednesday && <p>Closed</p>}

          <li>Thursday</li>
          {this.state.weekdays.thursday && <p>Open</p>}
          {!this.state.weekdays.thursday && <p>Closed</p>}

          <li>Friday</li>
          {this.state.weekdays.friday && <p>Open</p>}
          {!this.state.weekdays.friday && <p>Closed</p>}

          <li>Saturday</li>
          {this.state.weekdays.saturday && <p>Open</p>}
          {!this.state.weekdays.saturday && <p>Closed</p>}

          <li>Sunday</li>
          {this.state.weekdays.sunday && <p>Open</p>}
          {!this.state.weekdays.monday && <p>Closed</p>}
        </ul>

        <h4>Seating information</h4>
        <p>Number of tables: {this.state.tablenumber}</p>
        <ul>
          <li>{/* map over array of tables and get their info? */}</li>

          {/* render() {
    const data =[{"name":"test1"},{"name":"test2"}];
    return (
      <div>
      {data.map(function(d, idx){
         return (<li key={idx}>{d.name}</li>)
       })}
      </div>
    );
  } */}
        </ul>

        <Link to="/restaurant/edit">
          <button>Edit information</button>
        </Link>
      </div>
    );
  }
}
