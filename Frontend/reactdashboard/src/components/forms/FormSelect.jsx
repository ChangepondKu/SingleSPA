import React from 'react';

const FormSelect = ({ label, name, value, onChange, options, required = false }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="form-select"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;