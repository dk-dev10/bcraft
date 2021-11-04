import React from 'react';
import classNames from 'classnames/bind';

import style from './style.module.scss';

const cn = classNames.bind(style);

const Button = ({ children, btnLine, disable, onClick }) => {
  return (
    <button
      className={cn('button', { buttonLine: btnLine })}
      disabled={disable}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
