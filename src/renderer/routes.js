import { Route, IndexRoute, } from 'react-router';
import React from 'react';
import App from './components/App';
import Config from './components/config/Config';
import Home from './components/Home';

function requireSettings(nextState, replace) {
  if (!localStorage.server || localStorage.user || localStorage.password) {
    replace({
      pathname: '/config',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='config' component={Config} />
  </Route>
);

export default routes;
