import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';

import Input from '../../components/Input';
import { CHANGE_PASSWORD } from '../../redux/types';

import style from './style.module.scss';

const Change = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const password = getValues().password;

  const token = useSelector((state) => state.token);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const history = useHistory();

  const [rptPswrd, setRptPswrd] = useState(true);
  const [rptPass, setRptPass] = useState('');
  const [oldPass, setOldPass] = useState('');

  const onSubmit = (data) => {
    const user = { ...data, id: Number(token), oldPass };
    dispatch({ type: CHANGE_PASSWORD, payload: user });

    history.push('/');
  };

  useEffect(() => {
    password !== rptPass ? setRptPswrd(false) : setRptPswrd(true);
  }, [rptPass, password]);

  return (
    <div className={style.cont}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='password'
          label='Password'
          placeholder='password'
          error={error && error}
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
        />

        <Input
          type='password'
          label='Пароль'
          placeholder='Введите пароль'
          args={{
            ...register('password', {
              required: 'Обязательное поля',
              pattern: {
                value: /[A-Z]/,
                message: 'Должен быть одно заглавная буква',
              },
              minLength: {
                value: 6,
                message: 'Слишком короткий пароль',
              },
              maxLength: {
                value: 12,
                message: 'Слишком длинный пароль',
              },
            }),
          }}
          error={errors.password?.message && errors.password?.message}
        />

        <Input
          type='password'
          label='Подтвердите пароль'
          placeholder='Введите пароль'
          value={rptPass}
          onChange={(e) => setRptPass(e.target.value)}
          error={!rptPswrd && 'Пароли не совпадают!'}
        />
        <div className={style.btns}>
          <Button disable={!rptPswrd}>Изменить</Button>
          <Button onClick={() => history.push('/')}>На главную</Button>
        </div>
      </form>
    </div>
  );
};

export default Change;
