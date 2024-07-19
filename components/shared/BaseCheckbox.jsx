const BaseCheckbox = ({
    label,
    classx,
    name,
    value,
    onChange,
    estado,
    checked
}) => {
    return (

        <>
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <div className={`flex items-center ps-4 border border-gray-200 rounded ${classx}`}>
                <div className="flex items-center h-5">
                    <input id="helper-checkbox"
                        aria-describedby="helper-checkbox-text"
                        type="checkbox"
                        value={value}
                        onChange={onChange}
                        checked={checked}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                </div>
                <div className="ms-2 text-sm">
                    <label for="helper-checkbox" className={`${estado == 0 ? 'text-red-600' : 'text-gray-900'} font-medium `}> {name}</label>
                    <p id="helper-checkbox-text" className={`text-xs font-normal ${estado == 0 ? 'text-red-400' : 'text-gray-500'}`}>For orders shipped from $25 in books or $29 in other categories</p>
                </div>
            </div >


        </>
    )
}

export default BaseCheckbox