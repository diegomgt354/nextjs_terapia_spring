import BaseCheckbox from "./BaseCheckbox"

const BaseCheckboxList = ({
    label,
    classx,
    onChange,
    options,
    checkedsValues = []
}) => {
    return (
        <div className={`mb-5 ${classx}`}>
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            {options.map((option) => (
                <BaseCheckbox
                    key={option.id}
                    name={option.nombre}
                    value={option.id}
                    estado={option.estado}
                    onChange={onChange}
                    checked={checkedsValues.includes(option.id) ? true : false}
                />
            ))}
        </div>
    )
}

export default BaseCheckboxList