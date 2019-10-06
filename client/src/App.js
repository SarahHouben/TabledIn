import React from "react";
import Navbar from "./components/Navbar";
import { Route, Redirect, Switch } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import RestaurantForm from "./components/RestaurantForm";
import ShowRestaurant from "./components/ShowRestaurant";
import EditRestaurant from "./components/EditRestaurant";
import Bookings from "./components/Bookings";
import BookingForm from "./components/BookingForm";
import Planner from "./components/Planner";
import EditPlanner from "./components/EditPlanner";
import "./scss/App.scss";

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
    // console.log(this.state);
    return (
      <div className="App">
        <Navbar user={this.state.user} setUser={this.setUser} />
        <Switch>
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
          <Route
            exact
            path="/restaurant/new"
            render={props => {
              if (this.state.user) return <RestaurantForm {...props} />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route
            exact
            path="/"
            render={props => {
              if (this.state.user) return <Bookings {...props} />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route
            exact
            path="/booking/add"
            render={props => {
              if (this.state.user) return <BookingForm {...props} />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route
            exact
            path="/restaurant/edit"
            render={props => {
              if (this.state.user) return <EditRestaurant {...props} />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route
            exact
            path="/restaurant/show"
            render={props => {
              if (this.state.user) return <ShowRestaurant {...props} />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route
            exact
            path="/planner"
            render={props => {
              if (this.state.user) return <Planner {...props} />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route
            exact
            path="/planner/edit"
            render={props => {
              if (this.state.user) return <EditPlanner {...props} />;
              else return <Redirect to="/login" />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
