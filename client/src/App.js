import React from "react";
import Navbar from "./components/Navbar";
import { Route, Redirect } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import './App.css';

class App extends React.Component {
  state = {
    user: this.props.user
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Navbar user={this.state.user} setUser={this.setUser} />
        <Route
          exact
          path="/signup"
          render={props => (
            //spread props object so that all properties of props are passed on
            <Signup setUser={this.setUser} {...props} />
          )}
        />
        <Route
          exact
          path="/login"
          render={props => <Login setUser={this.setUser} {...props} />}
        />
      </div>
    );
  }
}

export default App;
