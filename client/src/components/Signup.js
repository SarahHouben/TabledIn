import React, { Component } from "react";
import { signup } from "../services/api";
import { Link } from "react-router-dom";

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
    // console.log("THIS STATE:", username, password, email);
    signup(username, password, email).then(data => {
      // console.log("DATA: ", data);
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          email: "",
          password: ""
        });
      } else {
        // console.log(data);
        //successfully signed up
        // update the state of the parent component
        this.props.setUser(data);
        // console.log(this.props);
        //redirect to RESTAURANT SIGNUP/CREATION PAGE
        this.props.history.push("/restaurant/new");
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
          <h2>Signup</h2>
          <form className="auth-form" onSubmit={this.handleSubmit}>
            <input
              placeholder="Username"
              type="text"
              name="username"
              value={this.state.username}
              required
              onChange={this.handleChange}
              id="username"
            />

            <input
              placeholder="Email"
              type="text"
              name="email"
              value={this.state.email}
              required
              onChange={this.handleChange}
              id="email"
            />

            <input
              placeholder="Password"
              type="password"
              name="password"
              required
              value={this.state.password}
              onChange={this.handleChange}
              id="password"
            />

            {this.state.message && (
              <p className="auth-message">{this.state.message}</p>
            )}
            <button className="edit-button" type="submit">
              Signup
            </button>
          </form>
          <p>
            ...or <Link to="/login">log in</Link>
          </p>
        </div>
        <p className="test_cred_p">
          Want to test the app? Get the test-credentials{" "}
          <Link to="/about">here</Link>.
        </p>
      </>
    );
  }
}
