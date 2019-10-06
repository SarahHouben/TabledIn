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
        <div className="auth-div__top">
          <h1>TabledIn</h1>
          <p>Manage your reservations.</p>
          <p>Adapt your opening times.</p>
          <p>Let customers find you with Google AI.</p>
        </div>
        <div className="auth-div__bottom">
          <h2>Login</h2>
          <form className="auth-form" onSubmit={this.handleSubmit}>
            <input
              placeholder="Username"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              id="username"
            />

            <input
              placeholder="Password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              id="password"
            />

            {this.state.message && (
              <p className="auth-message">{this.state.message}</p>
            )}
            <button className="edit-button" type="submit">Login</button>
          </form>
          <p>
            ...or <Link to="/signup">sign up</Link>
          </p>
        </div>
      </>
    );
  }
}
