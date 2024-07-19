import React from 'react'
import { TbPointFilled } from 'react-icons/tb'

const BaseTag = ({
    status,
    textColor = 'text-white'
}) => {
    return (
        <div className={`flex justify-center items-center gap-1 min-w-[120px] ${status === 1 ? 'bg-green-500' : 'bg-red-500'} ${textColor} 
                 rounded-lg font-extrabold`}>
            <TbPointFilled className="text-3xl" />
            {status === 1 ? 'Activo' : 'Inactivo'}
        </div>
    )
}

export default BaseTag