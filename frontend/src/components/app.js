import React from "react";
import { AuthRoute, ProtectedRoute, LoggedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";

import SplashPageComponent from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import ApplicationComponent from "./application/application_component";

const App = () => (
  <div>
    <Switch>
      <ProtectedRoute path="/app" component={ApplicationComponent} />
      <AuthRoute exact path="/" component={SplashPageComponent} />

      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </Switch>
  </div>
);

export default App;