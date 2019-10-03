import React, { Component } from "react";
import TableRow from "./TableRow";

export default class TableForm extends Component {

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
