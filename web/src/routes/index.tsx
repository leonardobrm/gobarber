import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/dashboard" isPrivate exact component={Dashboard} />

    <Route path="*" exact component={NotFound} />
  </Switch>
);

export default Routes;
