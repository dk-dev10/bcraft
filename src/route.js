import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import NotFound from './pages/404';
import Auth from './pages/Auth';
import Main from './pages/Main';

export const MAIN_ROUTE = 'MAIN_ROUTE';
export const PEOPLE_DETAILS_ROUTE = 'PEOPLE_DETAILS_ROUTE';
export const AUTH_ROUTE = 'AUTH_ROUTE';

const token = false;

const privateRoutes = [
  {
    id: MAIN_ROUTE,
    path: '/',
    exact: true,
    component: Main,
  },
  {
    id: PEOPLE_DETAILS_ROUTE,
    path: '*',
    exact: false,
    component: NotFound,
  },
];

const publicRoutes = [
  {
    id: AUTH_ROUTE,
    path: '/auth',
    exact: true,
    component: Auth,
  },
];

const routes = token ? (
  <>
    {privateRoutes.map((route) => {
      const { path, exact, id, component } = route;

      return (
        <Route path={path} key={id} exact={exact}>
          {component}
        </Route>
      );
    })}
    <Redirect to='/auth' />
  </>
) : (
  <>
    {publicRoutes.map((route) => {
      const { path, exact, id, component } = route;

      return (
        <Route path={path} key={id} exact={exact}>
          {component}
        </Route>
      );
    })}
    <Redirect to='/auth' />
  </>
);

export default function Routes() {
  return <Switch>{routes}</Switch>;
}
