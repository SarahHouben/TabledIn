import React, { Component } from 'react';
import TimeForm from './TimeForm';
import TableForm from './TableForm';
import axios from 'axios';

export default class EditRestaurant extends Component {
  state = {
    name: '',
    address: '',
    phone: '',
    email: '',
    menu: '',
    logo: '',
    message: '',
    weekdays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    tablenumber: 0,
    tables: [],
    openingtimes: {
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
      sunday: {},
    },
  };

  //get Restaurant Data
  getData = () => {
    axios
      .get('/api/v2/restaurants')
      .then((res) => {
        const {
          name,
          address,
          phone,
          email,
          weekdays,
          tablenumber,
          tables,
          openingtimes,
          menu,
          message,
          logo,
        } = res.data;

        this.setState({
          name,
          address,
          phone,
          email,
          weekdays,
          tablenumber,
          tables,
          openingtimes,
          menu,
          message,
          logo:
            logo ||
            'https://res.cloudinary.com/dmlqhwwfc/image/upload/v1570446767/TabledIn/tabledin_logo.png',
        });
      })
      .catch((err) => {
        console.log(err.response);
        // handle err.response depending on err.response.status
        if (err.response.status === 404) {
          this.setState({ error: 'Not found' });
        }
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  //UPLOAD MENU (PDF)
  fileChangedHandlerMenu = (event) => {
    const menuFile = event.target.files[0];

    const uploadData = new FormData();
    uploadData.append('menu', menuFile);

    axios.post('/api/v2/add-image/menu', uploadData).then((response) => {
      const menu = response.data.secure_url;
      this.setState({ menu: menu });
    });
  };

  //UPLOAD LOGO
  fileChangedHandlerLogo = (event) => {
    const logoFile = event.target.files[0];

    const uploadData = new FormData();
    uploadData.append('logo', logoFile);

    axios.post('/api/v2/add-image/logo', uploadData).then((response) => {
      const logo = response.data.secure_url;
      this.setState({ logo: logo });
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(
      {
        [name]: value,
      },
      () => {
        if (name === 'tablenumber' && this.state.tablenumber) {
          this.initializedTable(this.state.tablenumber);
        }
      }
    );
  };

  setOpeningTime = (name, value, weekday) => {
    //valute that we get from time form is a string and we need it as a number in DB
    let valueInt = Number(value.replace(':', ''));
    this.setState({
      openingtimes: {
        ...this.state.openingtimes,
        [weekday]: {
          ...this.state.openingtimes[weekday],
          [name]: valueInt,
        },
      },
    });
  };

  //get values from checkboxes and update states of weekdays with them
  handleCheckboxChange = (event) => {
    const { weekdays } = { ...this.state };
    const currentState = weekdays;

    const name = event.target.name;
    const check = event.target.checked;
    currentState[name] = check;

    this.setState({ weekdays: currentState });
  };

  //create array of tables based on table number with default empty states for cap and num
  initializedTable = (tableNumber) => {
    let newTableState = [...Array(Number(tableNumber))].map((table) => ({
      cap: 0,
      num: '',
    }));
    this.setState({ tables: newTableState });
  };

  //update array of tables with cap and num according to their indexes. Update state with tables with correct state.
  tablesStage2B = (cap, num, index) => {
    let totalTables = this.state.tables.map((table, i) => {
      if (index === i) {
        return {
          cap,
          num,
        };
      } else return table;
    });

    this.setState(
      {
        tables: totalTables,
      },
      () => {}
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      name,
      address,
      phone,
      email,
      logo,
      menu,
      weekdays,
      tablenumber,
      tables,
      openingtimes,
    } = this.state;

    axios
      .put('/api/v2/restaurants', {
        name,
        address,
        phone,
        email,
        logo,
        menu,
        weekdays,
        tablenumber,
        tables,
        openingtimes,
      })
      .then((res) => {
        if (res.data.message) {
          this.setState({
            message: res.data.message,
          });
        } else {
          this.props.history.push('/restaurant/show');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <h2 className="rest-form-header">
          Update Information for {this.state.name}
        </h2>

        <form onSubmit={this.handleSubmit} className="rest-form-form">
          <h3>General information: </h3>
          <div className="rest-form-info-div">
            <label htmlFor="address">Address: </label>
            <input
              type="text"
              name="address"
              id="address"
              value={this.state.address}
              onChange={this.handleChange}
            />

            <label htmlFor="phone">Phone number: </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={this.state.phone}
              onChange={this.handleChange}
            />

            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />

            <label htmlFor="logo">Change Logo (PNG, JPEG): </label>
            <input
              type="file"
              name="logo"
              id="logo"
              onChange={this.fileChangedHandlerLogo}
            />

            <label htmlFor="menu">Upload new Menu (PDF): </label>
            <input
              type="file"
              name="menu"
              id="menu"
              onChange={this.fileChangedHandlerMenu}
            />
          </div>

          <h3>Opening times: </h3>
          <div className="rest-form-time-div">
            <div>
              <p>Monday</p>
              <label htmlFor="monday">Open? </label>
              <input
                type="checkbox"
                name="monday"
                id="monday"
                checked={this.state.weekdays.monday}
                onChange={this.handleCheckboxChange}
              />
              {this.state.weekdays.monday && (
                <TimeForm
                  openingtimes={this.state.openingtimes.monday}
                  setOpeningTime={this.setOpeningTime}
                  weekday={'monday'}
                />
              )}
            </div>
            <div>
              <p>Tuesday</p>
              <label htmlFor="tuesday">Open? </label>
              <input
                type="checkbox"
                name="tuesday"
                id="tuesday"
                checked={this.state.weekdays.tuesday}
                onChange={this.handleCheckboxChange}
              />
              {this.state.weekdays.tuesday && (
                <TimeForm
                  openingtimes={this.state.openingtimes.tuesday}
                  setOpeningTime={this.setOpeningTime}
                  weekday={'tuesday'}
                />
              )}
            </div>
            <div>
              <p>Wednesday</p>
              <label htmlFor="wednesday">Open? </label>
              <input
                type="checkbox"
                name="wednesday"
                id="wednesday"
                checked={this.state.weekdays.wednesday}
                onChange={this.handleCheckboxChange}
              />
              {this.state.weekdays.wednesday && (
                <TimeForm
                  openingtimes={this.state.openingtimes.wednesday}
                  setOpeningTime={this.setOpeningTime}
                  weekday={'wednesday'}
                />
              )}
            </div>
            <div>
              <p>Thursday</p>
              <label htmlFor="thursday">Open? </label>
              <input
                type="checkbox"
                name="thursday"
                id="thursday"
                checked={this.state.weekdays.thursday}
                onChange={this.handleCheckboxChange}
              />
              {this.state.weekdays.thursday && (
                <TimeForm
                  openingtimes={this.state.openingtimes.thursday}
                  setOpeningTime={this.setOpeningTime}
                  weekday={'thursday'}
                />
              )}
            </div>
            <div>
              <p>Friday</p>
              <label htmlFor="friday">Open? </label>
              <input
                type="checkbox"
                name="friday"
                id="friday"
                checked={this.state.weekdays.friday}
                onChange={this.handleCheckboxChange}
              />
              {this.state.weekdays.friday && (
                <TimeForm
                  openingtimes={this.state.openingtimes.friday}
                  setOpeningTime={this.setOpeningTime}
                  weekday={'friday'}
                />
              )}
            </div>
            <div>
              <p>Saturday</p>
              <label htmlFor="saturday">Open? </label>
              <input
                type="checkbox"
                name="saturday"
                id="saturday"
                checked={this.state.weekdays.saturday}
                onChange={this.handleCheckboxChange}
              />
              {this.state.weekdays.saturday && (
                <TimeForm
                  openingtimes={this.state.openingtimes.saturday}
                  setOpeningTime={this.setOpeningTime}
                  weekday={'saturday'}
                />
              )}
            </div>
            <div>
              <p>Sunday</p>
              <label htmlFor="sunday">Open? </label>
              <input
                type="checkbox"
                name="sunday"
                id="sunday"
                checked={this.state.weekdays.sunday}
                onChange={this.handleCheckboxChange}
              />
              {this.state.weekdays.sunday && (
                <TimeForm
                  openingtimes={this.state.openingtimes.sunday}
                  setOpeningTime={this.setOpeningTime}
                  weekday={'sunday'}
                />
              )}
            </div>
          </div>

          <h3>Seating information: </h3>
          <div className="rest-form-table-div">
            <div className="rest-form-table-tnumber">
              <label htmlFor="tablenumber">Number of tables: </label>
              <input
                type="number"
                name="tablenumber"
                id="tablenumber"
                value={this.state.tablenumber}
                onChange={this.handleChange}
                min="0"
              />
            </div>
            {/* render TableForm with amount of TableRows equal to number of tables */}
            <TableForm
              tables={this.state.tables}
              tableAmount={this.state.tablenumber}
              tablesStage2A={this.tablesStage2B}
            />
          </div>
          {this.state.message && (
            <p className="auth-message">{this.state.message}</p>
          )}
          <button className="edit-button" type="submit">
            Submit
          </button>
        </form>
      </>
    );
  }
}
