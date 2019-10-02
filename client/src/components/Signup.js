import React, { Component } from "react";
import { signup } from "../services/api";

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    message: ""
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username, password, email } = this.state;
    console.log("THIS STATE:", username, password, email);
    signup(username, password, email).then(data => {
      console.log("DATA: ", data);
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          email: "",
          password: ""
        });
      } else {
        console.log(data);
        //successfully signed up
        // update the state of the parent component
        this.props.setUser(data);
        console.log(this.props);
        //redirect to home CHANGE LATER TO WELCOME PAGE OR STH LIKE THAT
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <>
        <h2>Signup</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              id="username"
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              id="password"
            />
          </div>
          {this.state.message && <p>{this.state.message}</p>}
          <button type="submit">Signup</button>
        </form>
      </>
    );
  }
}
