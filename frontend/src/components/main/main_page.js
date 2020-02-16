import NavBarContainer from "../nav/navbar_container";
import { Link } from "react-router-dom";
import React from "react";
import "./main_page.css";

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <NavBarContainer />
        <div className="main-page-div">
          <div className="main-page-float-div">
            <h1>Lets get ready to Rumble!</h1>
            <p>Are you a retired professional wrestler looking for a friendly match? Start meeting other wrestlers in your area today with rumble!</p>
            <div className="main-page-buttons-div">
              <Link to="login">
                <button className="main-page-button-login">log in / join</button>
              </Link>
              <Link to="app">
                <button className="main-page-button-demo">try our demo</button>
              </Link>
            </div>
          </div>
        <div className="footer-text" >© 2020 Rumble | All Rights Reserved English (United States)</div>
        </div>
      </div>
    );
  }
}

export default MainPage;
