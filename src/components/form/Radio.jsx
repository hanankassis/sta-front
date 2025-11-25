import React from "react";

export default function Radio({label , tuples, name, formDataValue, onChange }) {
    // console.log(tuples)
  return (
    
    <div className="my-3">
      <label>{label}</label>
      {tuples.map( ({ label, value }) => (
        <label key={value} style={{ marginRight: "20px" }}>
          <input
            type="radio"
            value={value}
            name={name}
            checked={formDataValue === value}
            onChange={onChange}
            className="ms-1"
          />
          {label}
        </label>
      ))}
    </div>
  );
}
