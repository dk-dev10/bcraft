import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { SIGN_IN } from '../../../redux/types';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  const onSubmit = (data) => {
    console.log(data);
    dispatch({ type: SIGN_IN, payload: data });
  };

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
          }),
        }}
        error={error && error}
      />
      <Button type='submit'>Войти</Button>
    </form>
  );
};

export default Login;
