
import ConfirmationNotice from "../components/confirmationNotice";
import React from "react";
import RegistrationForm from "../components/registrationForm";
import UserReport from "../components/userReport";
import { browserHistory, Router, Route } from "react-router";

const routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={RegistrationForm} />
    <Route path="/confirmation" component={ConfirmationNotice} />
    <Route path="/admin" component={UserReport} />
  </Router>
);

export default routes;

