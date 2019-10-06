import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import uuidv4 from "uuid/v4";

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
        // console.log(response);
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
    const tables = this.state.tables;
    const tableItems = tables.map(table => {
      const id = uuidv4();
      return (
        <tr key={id}>
          <td>{table.num}</td>
          <td>{table.cap}</td>
        </tr>
      );
    });

    return (
      <div>
        <h2 className="rest-form-header">Information for {this.state.name}</h2>

        <h3>General information </h3>
        <em></em>
        <p>
          <strong>Address: </strong>
          {this.state.address}
        </p>
        <p>
          <strong>Email: </strong>
          {this.state.email}
        </p>
        <p>
          <strong>Phone: </strong>
          {this.state.phone}
        </p>

        <h3>Opening times</h3>
        <ul>
          <li>Monday:</li>

          {this.state.weekdays.monday ? <p>Open</p> : <p>Closed</p>}
          {this.state.weekdays.monday && (
            <p>Opens: {this.state.openingtimes.monday.opentime}</p>
          )}
          {this.state.weekdays.monday && (
            <p>Closes: {this.state.openingtimes.monday.closetime}</p>
          )}

          <li>Tuesday</li>
          {this.state.weekdays.tuesday ? <p>Open</p> : <p>Closed</p>}
          {this.state.weekdays.tuesday && (
            <p>Opens: {this.state.openingtimes.tuesday.opentime}</p>
          )}
          {this.state.weekdays.tuesday && (
            <p>Closes: {this.state.openingtimes.tuesday.closetime}</p>
          )}

          <li>Wednesday</li>
          {this.state.weekdays.wednesday ? <p>Open</p> : <p>Closed</p>}
          {this.state.weekdays.wednesday && (
            <p>Opens: {this.state.openingtimes.wednesday.opentime}</p>
          )}
          {this.state.weekdays.wednesday && (
            <p>Closes: {this.state.openingtimes.wednesday.closetime}</p>
          )}

          <li>Thursday</li>
          {this.state.weekdays.thursday ? <p>Open</p> : <p>Closed</p>}
          {this.state.weekdays.thursday && (
            <p>Opens: {this.state.openingtimes.thursday.opentime}</p>
          )}
          {this.state.weekdays.thursday && (
            <p>Closes: {this.state.openingtimes.thursday.closetime}</p>
          )}

          <li>Friday</li>
          {this.state.weekdays.friday ? <p>Open</p> : <p>Closed</p>}
          {this.state.weekdays.friday && (
            <p>Opens: {this.state.openingtimes.friday.opentime}</p>
          )}
          {this.state.weekdays.friday && (
            <p>Closes: {this.state.openingtimes.friday.closetime}</p>
          )}

          <li>Saturday</li>
          {this.state.weekdays.saturday ? <p>Open</p> : <p>Closed</p>}
          {this.state.weekdays.saturday && (
            <p>Opens: {this.state.openingtimes.saturday.opentime}</p>
          )}
          {this.state.weekdays.saturday && (
            <p>Closes: {this.state.openingtimes.saturday.closetime}</p>
          )}

          <li>Sunday</li>
          {this.state.weekdays.sunday ? <p>Open</p> : <p>Closed</p>}
          {this.state.weekdays.sunday && (
            <p>Opens: {this.state.openingtimes.sunday.opentime}</p>
          )}
          {this.state.weekdays.sunday && (
            <p>Closes: {this.state.openingtimes.sunday.closetime}</p>
          )}
        </ul>

        <h3>Seating</h3>
        <p>Number of tables: {this.state.tablenumber}</p>
        <table>
          <thead>
            <tr>
              <th>Table Id</th>
              <th>Guest number</th>
            </tr>
          </thead>
          <tbody>{tableItems}</tbody>
        </table>

        <Link to="/restaurant/edit">
          <button className="edit-button">Edit Info</button>
        </Link>
      </div>
    );
  }
}
