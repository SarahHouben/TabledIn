import React, { Component } from "react";
import { login } from "../services/api";
import { Link } from "react-router-dom";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
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

    const { username, password } = this.state;
    // console.log(username, password);
    login(username, password).then(data => {
      // console.log(data);
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: ""
        });
      } else {
        //successfully logged in
        // update the state of the parent component
        this.props.setUser(data);
        console.log(this.props);
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <>
        <h1>Welcome to TabledIn</h1>
        <h2>Login</h2>
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
          <button type="submit">Login</button>
        </form>
        Or <Link to="/signup">Sign up</Link>
      </>
    );
  }
}
