import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { textarea, large, address } from './style.module.scss';

const Textarea = ({
  className, isLarge, isAddress, minRows, value, onChange, ...props
}) => {
  const [rows, setRows] = useState(minRows);
  const [val, setValue] = useState(value);

  const handleChange = (e) => {
    const element = e.target;

    element.rows = minRows;

    const compStyles = window.getComputedStyle(element);
    const lineHeight = Number(compStyles.getPropertyValue('line-height').match(/\d*/)[0]);
    const rowCount = Math.floor(element.scrollHeight / lineHeight);

    element.rows = rowCount;

    setRows(rowCount);
    setValue(element.value);

    onChange && onChange(e); // eslint-disable-line
  };

  return (
    <textarea
      rows={rows}
      value={val}
      onChange={handleChange}
      className={[
        textarea,
        isLarge && large,
        isAddress && address,
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    />
  );
};

Textarea.propTypes = {
  value: PropTypes.string,
  isLarge: PropTypes.bool,
  minRows: PropTypes.number,
  onChange: PropTypes.func,
  isAddress: PropTypes.bool,
  className: PropTypes.string,
};

Textarea.defaultProps = {
  value: '',
  minRows: 1,
  isLarge: false,
  onChange: null,
  isAddress: false,
  className: null,
};

export default Textarea;
