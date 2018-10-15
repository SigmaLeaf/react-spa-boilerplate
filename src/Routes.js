import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import NotFound from "./NotFound";
import Settings from "./Settings";
import AppliedRoute from "./AppliedRoute";
import AuthenticatedRoute from './AuthenticatedRoutes';
import UnauthenticatedRoute from './UnauthenticatedRoute';
import ResetPassword from './ResetPassword';
import ChangePassword from './ChangePassword';

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/settings" exact component={Settings} props={childProps} />
    <AuthenticatedRoute
      path="/settings/password"
      exact
      component={ChangePassword}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/login/reset"
      exact
      component={ResetPassword}
      props={childProps}
    />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;