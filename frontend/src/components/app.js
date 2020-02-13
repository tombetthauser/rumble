import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";

import MainPage from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import EditFormContainer from './profile/edit-profile-container';
import UserProfileContainer from './profile/user-profile-container';
import MeetingsContainer from './meetings/meetings-container';

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <ProtectedRoute exact path="/" component={MainPage} />
      <ProtectedRoute exact path="/meeting" component={MeetingsContainer}/>
      <ProtectedRoute exact path='/user/:userId' component={UserProfileContainer}/>
      <ProtectedRoute exact path='/edit/:userId' component={EditFormContainer}/>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </Switch>
  </div>
);

export default App;
