import React, { Component } from "react";
import TimeForm from "./TimeForm";
import TableForm from "./TableForm";
import axios from "axios";

export default class EditRestaurant extends Component {
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
          openingtimes: response.data.openingtime
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

  handleChange = event => {
    const { name, value } = event.target;

    this.setState(
      {
        [name]: value
      },
      () => {
        if (name === "tablenumber" && this.state.tablenumber) {
          this.initializedTable(this.state.tablenumber);
        }
      }
    );
  };

  setOpeningTime = (name, value, weekday) => {
    //valute that we get from time form is a string and we need it as a number in DB
    let valueInt = Number(value.replace(":", ""));
    this.setState(
      {
        openingtimes: {
          ...this.state.openingtimes,
          [weekday]: {
            ...this.state.openingtimes[weekday],
            [name]: valueInt
          }
        }
      },
      () => console.log("updated state", this.state)
    );
  };
  //get values from checkboxes and update states of weekdays with them
  handleCheckboxChange = event => {
    const { weekdays } = { ...this.state };
    const currentState = weekdays;

    const name = event.target.name;
    const check = event.target.checked;
    currentState[name] = check;

    this.setState({ weekdays: currentState });
  };

  //create array of tables based on table number with default empty states for cap and num
  initializedTable = tableNumber => {
    let newTableState = [...Array(Number(tableNumber))].map(table => ({
      cap: 0,
      num: ""
    }));
    this.setState({ tables: newTableState });
  };

  //update array of tables with cap and num according to their indexes. Update state with tables with correct state.
  tablesStage2B = (cap, num, index) => {
    let totalTables = this.state.tables.map((table, i) => {
      if (index === i) {
        return {
          cap,
          num
        };
      } else return table;
    });

    this.setState(
      {
        tables: totalTables
      },
      () => {}
    );
  };

  handleSubmit = (event, str) => {
    event.preventDefault();

    const {
      name,
      address,
      phone,
      email,
      weekdays,
      tablenumber,
      tables,
      openingtimes
    } = this.state;

    axios
      .put("/api/restaurants", {
        name,
        address,
        phone,
        email,
        weekdays,
        tablenumber,
        tables,
        openingtimes
      })
      .then(data => {
        this.props.history.push("/restaurant/show");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h3>Edit restaurant here</h3>

        <React.Fragment>
          <form onSubmit={this.handleSubmit}>
            <h3>General information: </h3>
            <div>
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
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <h3>Opening times: </h3>
            <div>
              <div>
                <p>Monday</p>
                <label htmlFor="monday">Open? </label>
                <input
                  type="checkbox"
                  name="monday"
                  id="monday"
                  checked={this.state.weekdays.monday}
                  onChange={this.handleCheckboxChange}
                />
                {this.state.weekdays.monday && (
                  <TimeForm
                    openingtimes={this.state.openingtimes.monday}
                    setOpeningTime={this.setOpeningTime}
                    weekday={"monday"}
                  />
                )}
              </div>
              <div>
                <p>Tuesday</p>
                <label htmlFor="tuesday">Open? </label>
                <input
                  type="checkbox"
                  name="tuesday"
                  id="tuesday"
                  checked={this.state.weekdays.tuesday}
                  onChange={this.handleCheckboxChange}
                />
                {this.state.weekdays.tuesday && (
                  <TimeForm
                    openingtimes={this.state.openingtimes.tuesday}
                    setOpeningTime={this.setOpeningTime}
                    weekday={"tuesday"}
                  />
                )}
              </div>
              <div>
                <p>Wednesday</p>
                <label htmlFor="wednesday">Open? </label>
                <input
                  type="checkbox"
                  name="wednesday"
                  id="wednesday"
                  checked={this.state.weekdays.wednesday}
                  onChange={this.handleCheckboxChange}
                />
                {this.state.weekdays.wednesday && (
                  <TimeForm
                    openingtimes={this.state.openingtimes.wednesday}
                    setOpeningTime={this.setOpeningTime}
                    weekday={"wednesday"}
                  />
                )}
              </div>
              <div>
                <p>Thursday</p>
                <label htmlFor="thursday">Open? </label>
                <input
                  type="checkbox"
                  name="thursday"
                  id="thursday"
                  checked={this.state.weekdays.thursday}
                  onChange={this.handleCheckboxChange}
                />
                {this.state.weekdays.thursday && (
                  <TimeForm
                    openingtimes={this.state.openingtimes.thursday}
                    setOpeningTime={this.setOpeningTime}
                    weekday={"thursday"}
                  />
                )}
              </div>
              <div>
                <p>Friday</p>
                <label htmlFor="friday">Open? </label>
                <input
                  type="checkbox"
                  name="friday"
                  id="friday"
                  checked={this.state.weekdays.friday}
                  onChange={this.handleCheckboxChange}
                />
                {this.state.weekdays.friday && (
                  <TimeForm
                    openingtimes={this.state.openingtimes.friday}
                    setOpeningTime={this.setOpeningTime}
                    weekday={"friday"}
                  />
                )}
              </div>
              <div>
                <p>Saturday</p>
                <label htmlFor="saturday">Open? </label>
                <input
                  type="checkbox"
                  name="saturday"
                  id="saturday"
                  checked={this.state.weekdays.saturday}
                  onChange={this.handleCheckboxChange}
                />
                {this.state.weekdays.saturday && (
                  <TimeForm
                    openingtimes={this.state.openingtimes.saturday}
                    setOpeningTime={this.setOpeningTime}
                    weekday={"saturday"}
                  />
                )}
              </div>
              <div>
                <p>Sunday</p>
                <label htmlFor="sunday">Open? </label>
                <input
                  type="checkbox"
                  name="sunday"
                  id="sunday"
                  checked={this.state.weekdays.sunday}
                  onChange={this.handleCheckboxChange}
                />
                {this.state.weekdays.sunday && (
                  <TimeForm
                    openingtimes={this.state.openingtimes.sunday}
                    setOpeningTime={this.setOpeningTime}
                    weekday={"sunday"}
                  />
                )}
              </div>
            </div>

            <h3>Seating information: </h3>
            <label htmlFor="tablenumber">Number of tables: </label>
            <input
              type="number"
              name="tablenumber"
              id="tablenumber"
              value={this.state.tablenumber}
              onChange={this.handleChange}
              min="0"
            />
            {/* render TableForm with amount of TableRows equal to number of tables */}
            <TableForm
              tables={this.state.tables}
              tableAmount={this.state.tablenumber}
              tablesStage2A={this.tablesStage2B}
            />
            <button type="submit">Submit</button>
          </form>
        </React.Fragment>
      </div>
    );
  }
}
