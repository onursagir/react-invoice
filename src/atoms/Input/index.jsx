import React from 'react';
import PropTypes from 'prop-types';
import { input } from './style.module.scss';

const Input = ({ type, className, ...props }) => {
  const classNames = [input, className].filter(Boolean).join(' ');

  if (typeof type === 'string') {
    return (<input type={type} className={classNames} />);
  }

  const Type = type;
  return <Type {...props} className={classNames} />;
};

Input.propTypes = {
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  className: PropTypes.string,
};

Input.defaultProps = {
  type: 'string',
  className: null,
};

export default Input;
