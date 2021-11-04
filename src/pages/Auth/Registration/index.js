import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { CREATE_USER } from '../../../redux/types';

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const password = getValues().password;

  const [rptPswrd, setRptPswrd] = useState(true);
  const [rptPass, setRptPass] = useState('');
  const history = useHistory();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const user = { id: Date.now(), ...data };

    dispatch({ type: CREATE_USER, payload: user });

    reset({ email: '', password: '' });
    setRptPass('');

    alert('Вы успешно зарегистрировались!');
    history.push('/');
  };

  useEffect(() => {
    password !== rptPass ? setRptPswrd(false) : setRptPswrd(true);
  }, [rptPass, password]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='email'
        label='Email'
        placeholder='E-mail'
        args={{
          ...register('email', {
            required: 'Обязательное поля',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email не верный',
            },
          }),
        }}
        error={errors.email?.message && errors.email?.message}
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
      <Button disable={!rptPswrd}>Зарегистрироваться</Button>
    </form>
  );
};

export default Registration;
