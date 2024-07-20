const BaseSelectv2 = ({
    label,
    name,
    classx,
    // value,
    onChange,
    selected,
    options,
    register,
    required
}) => {
    return (
        <div className={`mb-5 ${classx}`}>
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <select
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                // name={name}
                // value={value}
                onChange={onChange}
            >
                <option value="-1" selected>Elige una opcion</option>
                {options.map(option => (
                    <option className={`${option.estado == 0 && 'text-red-600'}`}
                        key={option.id}
                        value={option.id}
                        selected={selected === option.id}
                        {...register(name, { required })}
                    >
                        {
                            ` ${option.nombre != null ? option.nombre : option.nombres + " " + option.apellido}`
                        }
                    </option>

                ))}
            </select>
        </div>
    )
}

export default BaseSelectv2