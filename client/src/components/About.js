import React, { Component } from "react";


export default class About extends Component {
  render() {
    return (
      <>
        <div className="auth-div__top">
          <h2>About TabledIn</h2>
          <p>
            TabledIn is an integrated bookings tool that allows restaurant
            owners to manage their schedules & automatically configure their own
            chatbot agent for taking reservations.
          </p>

          <h3>Programmers</h3>
          <p>
            This webapp was built as a final project for the Ironhack
            Webdevelopment Bootcamp, Summer 2019 in Berlin by Marko Milovanov
            and Sarah Houben.
          </p>

          <h3>Technologies</h3>
          <p>
            <strong>Restaurant webapp: </strong>
            ReactJS, Node.js, Express.js, Passport.js, MongoDB, Mongoose ODM
          </p>
          <p>
            <strong>Chatbot: </strong>Google Cloud Dialogflow
          </p>
        </div>
      </>
    );
  }
}
