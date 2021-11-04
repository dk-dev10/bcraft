import { CHANGE_PASSWORD, CREATE_USER, SIGN_IN, SIGN_OUT } from '../types';

const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

const users = localStorage.getItem('users')
  ? JSON.parse(localStorage.getItem('users'))
  : localStorage.setItem('users', JSON.stringify([]));

const initialState = {
  token,
  users,
  error: null,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      const newUser = [...state?.users, action.payload];
      localStorage.setItem('users', JSON.stringify(newUser));
      return {
        ...state,
        users: newUser,
      };

    case CHANGE_PASSWORD:
      const usr = state.users.filter(
        (item) => item?.id === action.payload.id
      )[0];

      if (usr.password === action.payload.oldPass) {
        const change = state.users.map((item) =>
          item['id'] === action.payload.id
            ? { ...item, password: action.payload.password }
            : item
        );
        localStorage.setItem('users', JSON.stringify(change));
        return {
          ...state,
          error: null,
          users: change,
        };
      } else {
        return {
          ...state,
          error: 'Пароль неверный',
        };
      }

    case SIGN_IN:
      const user = state.users.filter(
        (item) => item?.email === action.payload.email
      )[0];
      if (!!user) {
        if (user.password === action.payload.password) {
          localStorage.setItem('token', JSON.stringify(user.id));
          return {
            ...state,
            token: user.id,
            error: null,
          };
        } else {
          return {
            ...state,
            error: 'Неверный пароль!',
          };
        }
      } else {
        return {
          ...state,
          error: 'Такой пользователь не найден!',
        };
      }

    case SIGN_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
      };

    default:
      return state;
  }
};
