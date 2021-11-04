import React from 'react';

import style from './style.module.scss';

const Input = ({
  type = 'text',
  placeholder = 'Placeholder',
  error = '',
  label = 'Text',
  onChange,
  args,
}) => {
  return (
    <div className={style.inputWrapper}>
      <label htmlFor={type}>{label}</label>
      <input
        {...args}
        className={style.input}
        type={type}
        placeholder={placeholder}
        id={type}
        onChange={onChange}
        name={type}
      />
      <span>{error}</span>
    </div>
  );
};

export default Input;
