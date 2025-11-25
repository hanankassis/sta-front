// Input.js
import React from 'react';

const MyInput = ({ type, placeholder, name , value, onChange }) => {
    return (
        <input
            type={type??'text'}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{
                padding: '10px',
                margin: '10px 0',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '100%',
            }}
        />
    );
};

export default MyInput;
