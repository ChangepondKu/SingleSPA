import React from 'react';

const FormInput = ({ label, type = 'text', name, value, onChange, required = false, ...props }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="form-control"
        {...props}
      />
    </div>
  );
};

export default FormInput;