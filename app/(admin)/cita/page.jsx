'use client'

import BaseButton from '@/components/shared/BaseButton';
import BaseTag from '@/components/shared/BaseTag';
import BaseThead from '@/components/shared/BaseThead';
import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import { GrView } from 'react-icons/gr';
import CitaService from '@/services/CitaService';
import Link from 'next/link';

const CitaPage = () => {

    const [citas, setCitas] = useState([])
    const [cambio, setCambio] = useState(false)

    const columns = ['Id', 'Fecha Cita', 'Comentario', 'Paciente', 'Terapeuta', 'Servicio', 'Estado', 'Acciones'];

    useEffect(() => {
        CitaService.getCitas()
            .then(response => setCitas(response.data))
            .catch(error => console.log(error));
    }, [cambio]);

    const handleActionServicio = async (id, estado) => {
        let request = null;
        if (estado === 'delete') {
            request = CitaService.deleteCita(id);
        } else {
            request = CitaService.recoverCita(id);
        }
        request
            .then(() => {
                setCambio(!cambio);
            })
            .catch(error => console.log(error));
    };

    return (
        <>

            <div className="relative">

                <div className='flex justify-between items-center'>
                    <div></div>
                    <div>
                        <div className="text-3xl font-bold text-center mt-10">Citas</div>
                        <p className='text-center text-slate-400 mb-5'>Listado de Citas</p>
                    </div>
                    <Link href={'/cita/create'}>
                        <BaseButton
                            bgColor="bg-blue-500 hover:bg-blue-700"
                            label="Agregar Cita"
                            classx="rounded-full"
                        />
                    </Link>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-md sm:rounded-lg overflow-x-auto">

                    <BaseThead ths={columns} />

                    <tbody>
                        {
                            citas?.map(cita => (
                                <tr className="odd:bg-white even:bg-gray-50" key={cita.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {cita.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {cita.fecha}
                                    </td>
                                    <td className="px-6 py-4">
                                        {cita.comentario}
                                    </td>
                                    <td className="px-6 py-4">
                                        {cita.paciente?.nombres} {cita.paciente?.apellido}
                                    </td>
                                    <td className="px-6 py-4">
                                        {cita.terapeuta?.nombres} {cita.terapeuta?.apellidos}
                                    </td>
                                    <td className="px-6 py-4">
                                        {cita.servicio?.nombre}
                                    </td>
                                    <td className="px-6 py-4">
                                        <BaseTag status={cita.estado} />
                                    </td>
                                    <td className="flex items-center justify-center px-6 py-4 gap-2">

                                        <Link href={`/cita/${cita.id}/edit`}>
                                            <BaseButton
                                                bgColor="bg-yellow-500 hover:bg-yellow-700"
                                                label={<FaRegEdit />}
                                                classx="rounded-full"
                                            />
                                        </Link>

                                        <Link href={`/cita/${cita.id}/view`}>
                                            <BaseButton
                                                bgColor="bg-blue-500 hover:bg-blue-700"
                                                label={<GrView />}
                                                classx="rounded-full"
                                            />
                                        </Link>


                                        {cita.estado === 1 ? (
                                            <BaseButton
                                                bgColor="bg-red-500 hover:bg-red-700"
                                                label={<FaCircleXmark />}
                                                onClick={() => handleActionServicio(cita.id, 'delete')}
                                                classx="rounded-full"
                                            />
                                        ) : (
                                            <BaseButton
                                                bgColor="bg-green-500 hover:bg-green-700"
                                                label={<FaCircleCheck />}
                                                onClick={() => handleActionServicio(cita.id, 'recover')}
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

export default CitaPage