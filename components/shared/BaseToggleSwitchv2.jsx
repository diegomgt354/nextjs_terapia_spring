import React from 'react'

const BaseToggleSwitchv2 = ({
    value,
    label,
    name,
    valueActivate,
    onChange,
    register,
    required
}) => {
    return (

        <>

            <label className="inline-flex items-center mb-5 cursor-pointer">
                <input type="checkbox"
                    // value={value}
                    // name={name}
                    className="sr-only peer"
                    onChange={onChange}
                    checked={value == valueActivate}
                    {...register(name, { required })}
                />
                <div className="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full 
                    peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
                    after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 
                    after:h-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className={`ms-3 text-sm font-medium ${value == valueActivate ? 'text-blue-600' : 'text-gray-500'}`}>{label}</span>
            </label>

        </>
    )
}

export default BaseToggleSwitchv2