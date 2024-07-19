const BaseButton = ({
    type = 'button',
    label,
    bgColor,
    textColor = 'text-white',
    classx,
    onClick
}) => {
    return (
        <div>

            <button
                type={type}
                className={`rounded-lg px-1.5 py-1.5 text-center  
                focus:ring-4 focus:outline-none ${textColor} ${classx} ${bgColor}`}
                onClick={onClick}>

                {label}

            </button>
        </div>


    )
}

export default BaseButton