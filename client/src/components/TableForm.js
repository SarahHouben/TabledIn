import React, { Component } from "react";
import TableRow from "./TableRow";
import axios from "axios";

export default class TableForm extends Component {
  state = {
    tables: []
  };

  //pass props to parent (RestaurantForm)
  tablesStage1B = (cap, num, index) => {
    this.props.tablesStage2A(cap, num, index);
  };

  //get amount of tables from RestaurantForm. .
  getTableAmount = () => {
    let n = this.props.tableAmount; //n = number of tables
    n = parseInt(n);
    if (!n) {
      n = 0;
    }

    //Create a TableRow element for each table
    return [...Array(n)].map((e, i) => {
      return (
        <React.Fragment key={i}>
          <TableRow
            tablesStage1A={this.tablesStage1B}
            index={i}
            tableobject={this.state.tables[i]}
          />
        </React.Fragment>
      );
    });
  };

  getData = () => {
    axios
      .get("/api/v2/restaurants")
      .then(response => {
        if (response.data) {
          this.setState(
            {
              tables: response.data.tables
            }
            // () => console.log(this.state)
          );
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
    // Create list of table forms (list elements = amount of tables)
    const tables = this.getTableAmount();
    return (
      <ul>
        {tables.map((table, i) => {
          return <li key={i}>{table}</li>;
        })}
      </ul>
    );
  }
}
