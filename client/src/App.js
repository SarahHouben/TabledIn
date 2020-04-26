import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Toolbar from "./components/Toolbar";
import SideDrawer from "./components/SideDrawer";
import Backdrop from "./components/Backdrop";
import Signup from "./components/Signup";
import Login from "./components/Login";
import RestaurantForm from "./components/RestaurantForm";
import ShowRestaurant from "./components/ShowRestaurant";
import EditRestaurant from "./components/EditRestaurant";
import Bookings from "./components/Bookings";
import BookingForm from "./components/BookingForm";
import Planner from "./components/Planner";
import EditPlanner from "./components/EditPlanner";
import About from "./components/About";
import Privacy from "./components/Privacy";
import axios from "axios";

import "./scss/App.scss";

class App extends React.Component {
  state = {
    user: this.props.user,
    sideDrawerOpen: false,
    selectedDay: undefined
  };

  changeDate = data => {
    this.setState({
      selectedDay: data
    });
  };

  editSchedule = props => {
    // console.log(this.state.selectedDay)
    axios
      .delete("/api/v2/planner", { data: { selectedDay: this.state.selectedDay } })
      .then(res => {
        // console.log('fired' res)
        props.history.push("/planner/edit");
        // this.props.history.push("/planner/edit");
        //<Redirect to="/planner/edit" />;
      })
      .catch(err => {
        console.log(err);
      });
  };

  //set date to undefined
  onChange = () => {
    this.setState({
      selectedDay: undefined
    });
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  render() {
    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <div className="App" style={{ height: "100%" }}>
        <Toolbar
          drawerClickHandler={this.drawerToggleClickHandler}
          user={this.state.user}
          setUser={this.setUser}
        />
        <SideDrawer
          click={this.backdropClickHandler}
          show={this.state.sideDrawerOpen}
          user={this.state.user}
          setUser={this.setUser}
        />
        {backdrop}

        <main>
          <Switch>
          <Route
              exact
              path="/privacy"
              render={props => <Privacy setUser={this.setUser} {...props} />}
            />
            <Route
              exact
              path="/about"
              render={props => <About setUser={this.setUser} {...props} />}
            />
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
                if (this.state.user)
                  return (
                    <Planner
                      {...props}
                      changeDate={this.changeDate}
                      selectedDay={this.state.selectedDay}
                      editSchedule={this.editSchedule}
                    />
                  );
                else return <Redirect to="/login" />;
              }}
            />
            <Route
              exact
              path="/planner/edit"
              render={props => {
                if (this.state.user)
                  return (
                    <EditPlanner
                      {...props}
                      changeDate={this.changeDate}
                      selectedDay={this.state.selectedDay}
                      editSchedule={this.editSchedule}
                      onDateChange={this.onChange}
                    />
                  );
                else return <Redirect to="/login" />;
              }}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
