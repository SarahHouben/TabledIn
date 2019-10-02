import React, { Component } from "react";

export default class TableForm extends Component {
 
  //set state in which to export the values input into the tableform
  state = {
    cap: 0,
    num: ""
  };

  handleChange = event => {
    // const { name, value } = event.target;
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  // testFunct = event => {
  //   console.log(event)
  // }

  //get amount of tables from RestaurantForm. .
  getTableAmount = () => {
    let n = this.props.tableAmount; //NUMBER OF TABLES
    n = parseInt(n);
    if (!n) {
      n = 0;
    }

    //Create a list element for each table
    return [...Array(n)].map((e, i) => {
      return (
        <React.Fragment key={i}>
          <label htmlFor="num">Table number: </label>
          <input
            type="text"
            name="num"
            id="num"
            value={this.state.num}
            onChange={this.handleChange}
          />

          <label htmlFor="cap">Seats how many people?</label>
          <input
            type="number"
            name="cap"
            id="cap"
            value={this.state.cap}
            onChange={this.handleChange}
          />
        </React.Fragment>
      );
    });
  };

  render() {

    const cap = this.state.cap
    const num = this.state.num
    // const cap = this.props.test
    // test(cap, num)

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
