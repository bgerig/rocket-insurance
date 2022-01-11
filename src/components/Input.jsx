import React from "react";

const Input = (props) => {
    const { id, name, label, value, onChange, invalid, required, className = "", type = "text" } = props;
    return (
        <div className={`input-field ${className}`}>
            <label htmlFor={id} className={`block font-semibold ${invalid ? "text-red-600" : ""}`}>
                {label} {required ? <sup className="text-xs">*</sup> : ""}
            </label>
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                aria-required={required}
                aria-invalid={invalid}
                className={`block w-full bg-gray-200 px-3 py-1 rounded ${
                    invalid ? "bg-red-100" : ""
                }`}
            />
            {invalid && <span className="text-sm text-red-600">This field is required.</span>}
        </div>
    );
};

export default Input;
