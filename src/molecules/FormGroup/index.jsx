import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable jsx-a11y/label-has-for */
const FormGroup = ({ text, children }) => {
  const id = `${text.replace(/s/g, '_')}_${Math.random().toString(36).substr(2, 9)}`;

  return (
    <label className="form-group row" htmlFor={id}>
      <div className="col-lg-4 col-form-label">
        {text}
      </div>
      <div className="col-lg-8">
        {React.Children.map(children, child => (
          <child.type
            {...child.props}
            id={[child.props.id, id].filter(Boolean).join(' ')}
          />
        ))}
      </div>
    </label>
  );
};

FormGroup.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default FormGroup;
