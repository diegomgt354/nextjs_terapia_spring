'use client'

import BaseButton from '@/components/shared/BaseButton';
import BaseTag from '@/components/shared/BaseTag';
import BaseThead from '@/components/shared/BaseThead';
import TerapeutaService from '@/services/TerapeutaService';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

const TerapeutaPage = () => {

    const [terapeutas, setTerapeutas] = useState([])
    const [cambio, setCambio] = useState(false)

    const columns = ['Id', 'Tipo Documento', '# Documento', 'Nombre', 'Direccion', 'Telefono', 'Especialidad', 'Servicios', 'Estado', 'Acciones'];

    useEffect(() => {
        TerapeutaService.getTerapeutas()
            .then(response => setTerapeutas(response.data))
            .catch(error => console.log(error));
    }, [cambio]);

    const handleActionServicio = async (id, estado) => {
        let request = null;
        if (estado === 'delete') {
            request = TerapeutaService.deleteTerapeuta(id);
        } else {
            request = TerapeutaService.recoverTerapeuta(id);
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
                        <div className="text-3xl font-bold text-center mt-10">Terapeutas</div>
                        <p className='text-center text-slate-400 mb-5'>Listado de Terapeutas</p>
                    </div>
                    <Link href={'/terapeuta/create'}>
                        <BaseButton
                            bgColor="bg-blue-500 hover:bg-blue-700"
                            label="Agregar Terapeuta"
                            classx="rounded-full"
                        />
                    </Link>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-md sm:rounded-lg overflow-x-auto">

                    <BaseThead ths={columns} />

                    <tbody>
                        {
                            terapeutas?.map(terapeuta => (
                                <tr className="odd:bg-white even:bg-gray-50" key={terapeuta.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {terapeuta.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {terapeuta.tipoDocumento}
                                    </td>
                                    <td className="px-6 py-4">
                                        {terapeuta.numeroDocumento}
                                    </td>
                                    <td className="px-6 py-4">
                                        {terapeuta.nombres} {terapeuta.apellido}
                                    </td>
                                    <td className="px-6 py-4">
                                        {terapeuta.direccion}
                                    </td>
                                    <td className="px-6 py-4">
                                        {terapeuta.telefono}
                                    </td>
                                    <td className="px-6 py-4">
                                        {terapeuta.especialidad.nombre}
                                    </td>
                                    <td className="px-6 py-4">
                                        <ul className='max-w-md space-y-1 text-gray-500 list-inside'>
                                            {
                                                terapeuta.servicios.map((servicio) => (
                                                    <li className="flex items-center"
                                                        key={servicio.id}>

                                                        <svg className={`w-3.5 h-3.5 me-2 ${servicio.estado === 1 ? 'text-green-500' : 'text-gray-500'} flex-shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                        </svg>

                                                        {servicio.nombre}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </td>
                                    <td className="px-6 py-4">
                                        <BaseTag status={terapeuta.estado} />
                                    </td>
                                    <td className="flex items-center justify-center px-6 py-4 gap-2">

                                        <Link href={`/terapeuta/${terapeuta.id}/edit`}>
                                            <BaseButton
                                                bgColor="bg-yellow-500 hover:bg-yellow-700"
                                                label={<FaRegEdit />}
                                                classx="rounded-full"
                                            />
                                        </Link>

                                        <Link href={`/terapeuta/${terapeuta.id}/view`}>
                                            <BaseButton
                                                bgColor="bg-blue-500 hover:bg-blue-700"
                                                label={<GrView />}
                                                classx="rounded-full"
                                            />
                                        </Link>


                                        {terapeuta.estado === 1 ? (
                                            <BaseButton
                                                bgColor="bg-red-500 hover:bg-red-700"
                                                label={<FaCircleXmark />}
                                                onClick={() => handleActionServicio(terapeuta.id, 'delete')}
                                                classx="rounded-full"
                                            />
                                        ) : (
                                            <BaseButton
                                                bgColor="bg-green-500 hover:bg-green-700"
                                                label={<FaCircleCheck />}
                                                onClick={() => handleActionServicio(terapeuta.id, 'restore')}
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
            {/* <div>{JSON.stringify(terapeutas, null, 2)}</div> */}

        </>
    )
}

export default TerapeutaPage