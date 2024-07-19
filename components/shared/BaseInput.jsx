import React from 'react'

const BaseInput = ({
    type = 'text',
    name,
    classx,
    label,
    value,
    placeholder,
    onChange
}) => {
    return (
        <div className={`mb-5 ${classx}`}>
            <span className="block mb-2 text-sm font-medium text-gray-900">{label}</span>
            <input
                type={type}
                name={name}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                value={value}
                placeholder={placeholder}
                onChange={(event) => onChange(event)}
            />
        </div>
    )
}

export default BaseInput