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
    logo: "",
    menu: "",
    phonegateway: false,
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

  getData = () => {
    axios
      .get("/api/v2/restaurants")
      .then(response => {
        if (response) {
          Object.keys(response.data.openingtimes).forEach(key => {
            response.data.openingtimes[key].opentime = this.convertTime(
              response.data.openingtimes[key].opentime
            );
            response.data.openingtimes[key].closetime = this.convertTime(
              response.data.openingtimes[key].closetime
            );
          });

          this.setState({
            name: response.data.name,
            address: response.data.address,
            phone: response.data.phone,
            email: response.data.email,
            phonegateway: response.data.phonegateway,
            weekdays: response.data.weekdays,
            tablenumber: response.data.tablenumber,
            tables: response.data.tables,
            openingtimes: response.data.openingtimes,
            menu: response.data.menu,
            logo: response.data.logo
          });
        }
      })
      .catch(err => {
        console.log(err);
        // handle err.response depending on err.response.status
      
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
      <div className="rest-show-div">
        <h2 className="rest-form-header">Information for {this.state.name}</h2>

        <div className="rest-show-upload-div">
          <img
            className="rest-show-logo"
            src={this.state.logo}
            alt={this.state.name}
          />

          {this.state.menu && (
            <button className="view-button">
              <a
                href={this.state.menu}
                download="Menu"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Menu
              </a>
            </button>
          )}
        </div>

        <h3 className="rest-show-info-h3">General information</h3>
        <div className="rest-show-info-div">
          <div className="rest-show-info-div-address">
            <p className="address-p">
              <strong>Address: </strong>
              {/* {this.state.address} */}
            </p>
            <p>{this.state.address}</p>
          </div>
          {this.state.email && (
            <p>
              <strong>Email: </strong>
              {this.state.email}
            </p>
          )}

          {this.state.phone && (
            <p>
              <strong>Phone: </strong>
              {this.state.phone}
            </p>
          )}

          {this.state.phonegateway && (
            <p>
              <strong>Phone Gateway: </strong>
              +1 424-255-7279
            </p>
          )}
        </div>

        <h3 className="rest-show-info-h3">Opening times</h3>
        <ul className="rest-show-info-ul">
          <li>
            <strong className="rest-show-info-monday">Monday:</strong>
            {!this.state.weekdays.monday && <p>Closed</p>}
            {this.state.weekdays.monday && (
              <p>{this.state.openingtimes.monday.opentime} -</p>
            )}
            {this.state.weekdays.monday && (
              <p>{this.state.openingtimes.monday.closetime}</p>
            )}
          </li>

          <li>
            <strong className="rest-show-info-tuesday">Tuesday:</strong>
            {!this.state.weekdays.tuesday && <p>Closed</p>}
            {this.state.weekdays.tuesday && (
              <p>{this.state.openingtimes.tuesday.opentime} -</p>
            )}
            {this.state.weekdays.tuesday && (
              <p>{this.state.openingtimes.tuesday.closetime}</p>
            )}
          </li>

          <li>
            <strong className="rest-show-info-wednesday">Wednesday:</strong>
            {!this.state.weekdays.wednesday && <p>Closed</p>}
            {this.state.weekdays.wednesday && (
              <p>{this.state.openingtimes.wednesday.opentime} -</p>
            )}
            {this.state.weekdays.wednesday && (
              <p>{this.state.openingtimes.wednesday.closetime}</p>
            )}
          </li>

          <li>
            <strong className="rest-show-info-thursday">Thursday:</strong>
            {!this.state.weekdays.thursday && <p>Closed</p>}
            {this.state.weekdays.thursday && (
              <p>{this.state.openingtimes.thursday.opentime} -</p>
            )}
            {this.state.weekdays.thursday && (
              <p>{this.state.openingtimes.thursday.closetime}</p>
            )}
          </li>

          <li>
            <strong className="rest-show-info-friday">Friday:</strong>
            {!this.state.weekdays.friday && <p>Closed</p>}
            {this.state.weekdays.friday && (
              <p>{this.state.openingtimes.friday.opentime} -</p>
            )}
            {this.state.weekdays.friday && (
              <p>{this.state.openingtimes.friday.closetime}</p>
            )}
          </li>

          <li>
            <strong className="rest-show-info-saturday">Saturday:</strong>
            {!this.state.weekdays.saturday && <p>Closed</p>}
            {this.state.weekdays.saturday && (
              <p>{this.state.openingtimes.saturday.opentime} -</p>
            )}
            {this.state.weekdays.saturday && (
              <p>{this.state.openingtimes.saturday.closetime}</p>
            )}
          </li>

          <li>
            <strong className="rest-show-info-sunday">Sunday:</strong>
            {!this.state.weekdays.sunday && <p>Closed</p>}
            {this.state.weekdays.sunday && (
              <p>{this.state.openingtimes.sunday.opentime} -</p>
            )}
            {this.state.weekdays.sunday && (
              <p>{this.state.openingtimes.sunday.closetime}</p>
            )}
          </li>
        </ul>

        <h3 className="rest-show-info-h3">Seating</h3>
        <div className="rest-show-table-div">
          <p>
            Number of tables: <strong>{this.state.tablenumber}</strong>
          </p>
          <table>
            <thead>
              <tr>
                <th>Table Id</th>
                <th>Guest number</th>
              </tr>
            </thead>
            <tbody>{tableItems}</tbody>
          </table>
        </div>

        <Link to="/restaurant/edit">
          <button className="edit-button">Edit Info</button>
        </Link>
      </div>
    );
  }
}
