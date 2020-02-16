import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";

import SplashPageComponent from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import EditFormContainer from "./profile/edit-profile-container";
import UserProfileContainer from "./profile/user-profile-container";
import ApplicationComponent from "./application/application_component";
import MeetingsContainer from "./meetings/meetings-container";

const App = () => (
  <div>
    <Switch>
      <Route path="/app" component={ApplicationComponent} />
      <Route exact path="/" component={SplashPageComponent} />

      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />


      <ProtectedRoute exact path="/meeting" component={MeetingsContainer}/>
      <ProtectedRoute exact path='/user/:userId' component={UserProfileContainer}/>
      <ProtectedRoute exact path='/edit/:userId' component={EditFormContainer}/>

      {/* <ProtectedRoute exact path='/user/:userId' component={UserProfileContainer}/> */}
      {/* <ProtectedRoute exact path='/edit/:userId' component={EditFormContainer}/> */}
    </Switch>
  </div>
);

export default App;
