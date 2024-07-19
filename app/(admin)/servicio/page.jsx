'use client'

import BaseButton from '@/components/shared/BaseButton'
import BaseTag from '@/components/shared/BaseTag'
import BaseThead from '@/components/shared/BaseThead'
import ServicioService from '@/services/ServicioService'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { GrView } from 'react-icons/gr'
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

const ServicioPage = () => {

    const [servicios, setServicios] = useState([])
    const [cambio, setCambio] = useState(false)

    const columns = ['Id', 'Nombre', 'Descripcion', 'Estado', 'Acciones'];

    useEffect(() => {
        ServicioService.getServicios()
            .then(response => setServicios(response.data))
            .catch(error => console.log(error));
    }, [cambio]);

    const handleActionServicio = async (id, estado) => {
        let request = null;
        if (estado === 'delete') {
            request = ServicioService.deleteServicio(id);
        } else {
            request = ServicioService.recoverServicio(id);
        }
        request
            .then(() => {
                setCambio(!cambio);
            })
            .catch(error => console.log(error));
    };

    return (
        <>

            <div className="relative  ">

                <div className='flex justify-between items-center'>
                    <div></div>
                    <div>
                        <div className="text-3xl font-bold text-center mt-10">Servicios</div>
                        <p className='text-center text-slate-400 mb-5'>Listado de Servicios</p>
                    </div>
                    <Link href={'/servicio/create'}>
                        <BaseButton
                            bgColor="bg-blue-500 hover:bg-blue-700"
                            label="Agregar Servicio"
                            classx="rounded-full"
                        />
                    </Link>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-md sm:rounded-lg overflow-x-auto">

                    <BaseThead ths={columns} />

                    <tbody>
                        {
                            servicios?.map(servicio => (
                                <tr className="odd:bg-white even:bg-gray-50" key={servicio.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {servicio.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {servicio.nombre}
                                    </td>
                                    <td className="px-6 py-4">
                                        {servicio.descripcion}
                                    </td>
                                    <td className="px-6 py-4">
                                        <BaseTag status={servicio.estado} />
                                    </td>
                                    <td className="flex items-center justify-center px-6 py-4 gap-2">

                                        <Link href={`/servicio/${servicio.id}/edit`}>
                                            <BaseButton
                                                bgColor="bg-yellow-500 hover:bg-yellow-700"
                                                label={<FaRegEdit />}
                                                classx="rounded-full"
                                            />
                                        </Link>

                                        <Link href={`/servicio/${servicio.id}/view`}>
                                            <BaseButton
                                                bgColor="bg-blue-500 hover:bg-blue-700"
                                                label={<GrView />}
                                                classx="rounded-full"
                                            />
                                        </Link>


                                        {servicio.estado === 1 ? (
                                            <BaseButton
                                                bgColor="bg-red-500 hover:bg-red-700"
                                                label={<FaCircleXmark />}
                                                onClick={() => handleActionServicio(servicio.id, 'delete')}
                                                classx="rounded-full"
                                            />
                                        ) : (
                                            <BaseButton
                                                bgColor="bg-green-500 hover:bg-green-700"
                                                label={<FaCircleCheck />}
                                                onClick={() => handleActionServicio(servicio.id, 'recover')}
                                                classx="rounded-full"
                                            />
                                        )}

                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

        </>
    )
}

export default ServicioPage