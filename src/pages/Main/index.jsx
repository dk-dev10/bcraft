import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import { SIGN_OUT } from '../../redux/types';

import style from './style.module.scss';

const Main = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className={style.container}>
      <h1>Добро пожаловать!</h1>
      <div className={style.btns}>
        <Button onClick={() => dispatch({ type: SIGN_OUT })}>Выйти</Button>
        <Button onClick={() => history.push('/pass')}>Изменить пароль</Button>
      </div>
    </div>
  );
};

export default Main;
