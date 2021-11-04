import React from 'react';
import classNames from 'classnames/bind';

import style from './style.module.scss';
import Login from './Login';
import Registration from './Registration';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';

const cn = classNames.bind(style);

function Auth() {
  return (
    <div className={style.auth}>
      <div className={style.authHeader}>
        <NavLink
          className={cn('authLink')}
          activeClassName={cn('authLinkActive')}
          to={'/bcraft/login'}
        >
          Войти
        </NavLink>
        <NavLink
          className={cn('authLink')}
          activeClassName={cn('authLinkActive')}
          to={'/bcraft/regst'}
        >
          Регистрация
        </NavLink>
      </div>
      <div>
        <Switch>
          <Route path={'/bcraft/login'} exact>
            <Login />
          </Route>
          <Route path={'/bcraft/regst'} exact>
            <Registration />
          </Route>
          <Redirect to='/bcraft/login' />
        </Switch>
      </div>
    </div>
  );
}

export default Auth;
