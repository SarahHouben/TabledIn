import React, { Component } from "react";

export default class TableForm extends Component {

  const n = 8 //NUMBER OF TABLES

  const tables = [...Array(n)].map((e, i) => {
    return (<React.Fragment key={i}>

  <label htmlFor="tablenumber">Table number: </label>
  <input type="text" name="tablenumber" id="tablenumber" />

  <label htmlFor="tablecapacity">Seats how many?</label>
  <input type="number" name="tablecapacity" id="tablecapacity" />
  </React.Fragment>)
  }
  )


  render() {
    return (
      <ul>
        {tables.map(i => {
          return (
            <li>{i}</li>
            )
        }
        )}
      </ul>
    )
  }
}


