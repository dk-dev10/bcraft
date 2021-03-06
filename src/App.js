import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from './pages/Auth';
import Change from './pages/Change';
import Main from './pages/Main';

const App = () => {
  const token = useSelector((state) => state.token);

  const publicRoutes = (
    <Switch>
      <Route path={'/bcraft/'}>
        <Auth />
      </Route>
    </Switch>
  );

  const privateRoutes = (
    <Switch>
      <Route path={'/bcraft/'} exact>
        <Main />
      </Route>
      <Route path={'/bcraft/pass'} exact>
        <Change />
      </Route>
      <Redirect to={'/bcraft/'} />
    </Switch>
  );

  const routes = token ? privateRoutes : publicRoutes;

  return <div>{routes}</div>;
};

export default App;
