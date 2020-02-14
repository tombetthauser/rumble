import NavBarContainer from "../nav/navbar_container";
import React from "react";

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <NavBarContainer />
        <div className="main-page-div">
          <div className="main-page-float-div">
            <h1>Lets get ready to rumble</h1>
            <footer>Start meeting retired professional wrestlers in your area! If you already have an account, sign in to use Rumble on the web.</footer>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
