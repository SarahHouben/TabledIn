import React, { Component } from "react";

export default class TableForm extends Component {
  state = {
    cap: 0,
    num: ""
  };

  gettingTables = () => {
    let n = this.props.tableNb; //NUMBER OF TABLES
    n = parseInt(n);
    if (!n) {
      n = 0;
    }

    handleChange = event => {
      // const { name, value } = event.target;
      const name = event.target.name;
      const value = event.target.value;
      this.setState({
        [name]: value
      });
    };



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

          <label htmlFor="cap">Seats how many?</label>
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
    const cap = this.props.test

    test(cap, num)

    const tables = this.gettingTables();
    // console.log(tables);
    return (
      <ul>
        {tables.map((el, i) => {
          return <li key={i}>{el}</li>;
        })}
      </ul>
    );
  }
}
