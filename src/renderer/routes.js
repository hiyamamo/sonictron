import { Route, IndexRoute, } from 'react-router';
import React from 'react';
import App from './components/App';
import Config from './components/Config';
import Home from './components/Home';


const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='config' component={Config} />
  </Route>
);

export default routes;
