'use client'

import BaseButton from '@/components/shared/BaseButton'
import BaseTag from '@/components/shared/BaseTag'
import BaseThead from '@/components/shared/BaseThead'
import EspecialidadService from '@/services/EspecialidadService'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { GrView } from 'react-icons/gr'

const EspecialidadPage = () => {

    const [especialidades, setEspecialidades] = useState([])
    const [cambio, setCambio] = useState(false)

    const columns = ['Id', 'Nombre', 'Descripcion', 'Estado', 'Acciones'];

    useEffect(() => {
        EspecialidadService.getEspecialidades()
            .then(response => setEspecialidades(response.data))
            .catch(error => console.log(error));
    }, [cambio]);

    const handleActionServicio = async (id, estado) => {
        let request = null;
        if (estado === 'delete') {
            request = EspecialidadService.deleteEspecialidad(id);
        } else {
            request = EspecialidadService.recoverEspecialidad(id);
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
                        <div className="text-3xl font-bold text-center mt-10">Especialidades</div>
                        <p className='text-center text-slate-400 mb-5'>Listado de Especialidades</p>
                    </div>
                    <Link href={'/especialidad/create'}>
                        <BaseButton
                            bgColor="bg-blue-500 hover:bg-blue-700"
                            label="Agregar Especialidad"
                            classx="rounded-full"
                        />
                    </Link>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-md sm:rounded-lg overflow-x-auto">

                    <BaseThead ths={columns} />

                    <tbody>
                        {
                            especialidades?.map(especialidad => (
                                <tr className="odd:bg-white even:bg-gray-50" key={especialidad.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {especialidad.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {especialidad.nombre}
                                    </td>
                                    <td className="px-6 py-4">
                                        {especialidad.descripcion}
                                    </td>
                                    <td className="px-6 py-4">
                                        <BaseTag status={especialidad.estado} />
                                    </td>
                                    <td className="flex items-center justify-center px-6 py-4 gap-2">

                                        <Link href={`/especialidad/${especialidad.id}/edit`}>
                                            <BaseButton
                                                bgColor="bg-yellow-500 hover:bg-yellow-700"
                                                label={<FaRegEdit />}
                                                classx="rounded-full"
                                            />
                                        </Link>

                                        <Link href={`/especialidad/${especialidad.id}/view`}>
                                            <BaseButton
                                                bgColor="bg-blue-500 hover:bg-blue-700"
                                                label={<GrView />}
                                                classx="rounded-full"
                                            />
                                        </Link>


                                        {especialidad.estado === 1 ? (
                                            <BaseButton
                                                bgColor="bg-red-500 hover:bg-red-700"
                                                label={<FaCircleXmark />}
                                                onClick={() => handleActionServicio(especialidad.id, 'delete')}
                                                classx="rounded-full"
                                            />
                                        ) : (
                                            <BaseButton
                                                bgColor="bg-green-500 hover:bg-green-700"
                                                label={<FaCircleCheck />}
                                                onClick={() => handleActionServicio(especialidad.id, 'recover')}
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

export default EspecialidadPage