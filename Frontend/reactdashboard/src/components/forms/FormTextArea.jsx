import React from 'react';

const FormTextArea = ({ label, name, value, onChange, required = false, rows = 3 }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className="form-control"
      />
    </div>
  );
};

export default FormTextArea;