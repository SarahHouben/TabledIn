import React, { Component } from "react";
import TableRow from "./TableRow";

export default class TableForm extends Component {
  //set state in which to export the values input into the tableform
  // state = {
  //   tables: []
  // };

  // handleChange = event => {
  //   this.props.tablesStage2A(this.state.tables);
  //   console.log("table form handlechange");
  //   // console.log(event.target);
  //   // const name = event.target.name;
  //   // const value = event.target.value;
  //   // this.setState(
  //   //   {
  //   //     [name]: value
  //   //   },
  //   // () => {
  //   //   this.props.tableValues(this.state.tables);
  //   //   console.log(this.state);
  //   // }
  //   // );
  // };

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
          <TableRow tablesStage1A={this.tablesStage1B} index={i} />
        </React.Fragment>
      );
    });
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
