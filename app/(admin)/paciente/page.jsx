'use client'

import BaseButton from '@/components/shared/BaseButton';
import BaseTag from '@/components/shared/BaseTag';
import BaseThead from '@/components/shared/BaseThead';
import PacienteService from '@/services/PacienteService';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

const PacientePage = () => {
    const [pacientes, setPacientes] = useState([])
    const [cambio, setCambio] = useState(false)

    const columns = ['Id', 'Tipo Documento', '# Documento', 'Nombre', 'Email', 'Telefono', 'Genero', 'Fecha Nacimiento', 'Estado', 'Acciones'];

    useEffect(() => {
        PacienteService.getPacientes()
            .then(response => setPacientes(response.data))
            .catch(error => console.log(error));
    }, [cambio]);

    const handleActionServicio = async (id, estado) => {
        let request = null;
        if (estado === 'delete') {
            request = PacienteService.deletePaciente(id);
        } else {
            request = PacienteService.recoverPaciente(id);
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
                        <div className="text-3xl font-bold text-center mt-10">Pacientes</div>
                        <p className='text-center text-slate-400 mb-5'>Listado de Pacientes</p>
                    </div>
                    <Link href={'/paciente/create'}>
                        <BaseButton
                            bgColor="bg-blue-500 hover:bg-blue-700"
                            label="Agregar Paciente"
                            classx="rounded-full"
                        />
                    </Link>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-md sm:rounded-lg overflow-x-auto">

                    <BaseThead ths={columns} />

                    <tbody>
                        {
                            pacientes?.map(paciente => (
                                <tr className="odd:bg-white even:bg-gray-50" key={paciente.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {paciente.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {paciente.tipoDocumento}
                                    </td>
                                    <td className="px-6 py-4">
                                        {paciente.numeroDocumento}
                                    </td>
                                    <td className="px-6 py-4">
                                        {paciente.nombres} {paciente.apellido}
                                    </td>
                                    <td className="px-6 py-4">
                                        {paciente.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {paciente.telefono}
                                    </td>
                                    <td className="px-6 py-4">
                                        {paciente.genero}
                                    </td>
                                    <td className="px-6 py-4">
                                        {paciente.dateNacimiento}
                                    </td>
                                    <td className="px-6 py-4">
                                        <BaseTag status={paciente.estado} />
                                    </td>
                                    <td className="flex items-center justify-center px-6 py-4 gap-2">

                                        <Link href={`/paciente/${paciente.id}/edit`}>
                                            <BaseButton
                                                bgColor="bg-yellow-500 hover:bg-yellow-700"
                                                label={<FaRegEdit />}
                                                classx="rounded-full"
                                            />
                                        </Link>

                                        <Link href={`/paciente/${paciente.id}/view`}>
                                            <BaseButton
                                                bgColor="bg-blue-500 hover:bg-blue-700"
                                                label={<GrView />}
                                                classx="rounded-full"
                                            />
                                        </Link>


                                        {paciente.estado === 1 ? (
                                            <BaseButton
                                                bgColor="bg-red-500 hover:bg-red-700"
                                                label={<FaCircleXmark />}
                                                onClick={() => handleActionServicio(paciente.id, 'delete')}
                                                classx="rounded-full"
                                            />
                                        ) : (
                                            <BaseButton
                                                bgColor="bg-green-500 hover:bg-green-700"
                                                label={<FaCircleCheck />}
                                                onClick={() => handleActionServicio(paciente.id, 'recover')}
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
            {/* <div>{JSON.stringify(pacientes, null, 2)}</div> */}

        </>
    )
}

export default PacientePage