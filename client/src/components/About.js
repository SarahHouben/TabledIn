import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <>
        <div className="about-div">
          <h2>About TabledIn</h2>

          <p className="about-section-top-p">
            TabledIn is an integrated mobile-first bookings tool that allows
            restaurant owners to manage their schedules & automatically
            configure their own chatbot agent for taking reservations.
          </p>

          <h3 className="about-section-top-h3-middle">Programmers</h3>
          <p>
            This webapp was built as a final project for the Ironhack
            Webdevelopment Bootcamp, Summer 2019 in Berlin by{" "}
            <a
              className="about-text-link"
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/marko-milovanov-7522807a/"
            >
              Marko Milovanov{" "}
            </a>
            and{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="about-text-link"
              href="https://www.linkedin.com/in/sarahhouben"
            >
              Sarah Houben
            </a>
            .
          </p>

          <h3 className="about-section-top-h3-bottom">Technologies</h3>
          <p>
            <strong>Restaurant webapp: </strong>
            ReactJS, Node.js, Express.js, Passport.js, MongoDB, Mongoose ODM
          </p>
          <p>
            <strong>Chatbot: </strong>Google Cloud Dialogflow
          </p>

          <a
            target="_blank"
            rel="noopener noreferrer"
            className="about-image-link"
            href="https://github.com/SarahHouben/TabledIn"
          >
            {" "}
            <img src="github-icon.svg" alt="Github logo" /> View the source code
          </a>

          <h3 className="about-section-top-h3-bottom">Try it out</h3>
          <p className="about_subheader"><strong>Test the chatbot</strong></p>
          <p>
            If you would like to test the full functionality of TabledIn, click on <a
              target="_blank"
              rel="noopener noreferrer"
              className="about-text-link"
              href="https://assistant.google.com/services/a/uid/000000691425a561?hl"
            >this link{" "}
            </a>
          on a mobile device to sign up for the Alpha testing-stage of the chatbot with a gmail account. Once signed up, open Google Assistant and action TabledIn by saying <i>"Ok Google, talk to TabledIn"</i>. You will be asked to choose a restaurant. Currently you have the choice between the restaurants <i>"Nora's Garden"</i> and <i>"Pizzeria Da Toni"</i>. You can choose to make a reservation or to cancel a reservation under your name.
            </p>

            <p className="about_subheader"><strong>Sign into the webapp</strong></p>
            <p className="about_p">
              You can log into the web app using the test-credentials:
<div className="about_credentials">
            <p>For <i>"Pizzeria Da Toni"</i></p>  
              <ul>
                <li>Username: <i>"Toni"</i></li>
                <li>Password: <i>"testtest"</i></li>
              </ul>

             <p className="about_Nora">For <i>"Nora's Garden"</i></p>
              <ul>
                <li>Username: <i>"Nora"</i></li>
                <li>Password: <i>"testtest"</i></li>
              </ul>
</div>
              After signing in, you can view the bookings you have added via the chatbot,
            </p>
            <p>
             Alternatively, simply create a new free account  on the webapp to view the restaurant bookings platform.
          </p>
        </div>
      </>
    );
  }
}
