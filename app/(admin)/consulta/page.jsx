'use client'

import BaseButton from '@/components/shared/BaseButton';
import BaseThead from '@/components/shared/BaseThead';
import ConsultaService from '@/services/ConsultaService';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import Swal from 'sweetalert2';

const ConsultaPage = () => {

    const [consultas, setConsultas] = useState([])

    const columns = ['Id', 'Nombres', 'Telefono', 'Email', 'Fecha sugerida', 'Comentario', 'Servicio', 'Fecha Consulta', 'Acciones'];

    useEffect(() => {
        ConsultaService.getConsultas()
            .then(response => setConsultas(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleDeleteConsulta = async (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "rounded-full px-5 py-2 font-semibold bg-red-400 hover:bg-red-500 mx-2",
                cancelButton: "rounded-full px-5 py-2 font-semibold bg-blue-400 hover:bg-blue-500"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Está seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                // eliminamos la consulta
                ConsultaService.deleteConsulta(id)
                    .then(() => {
                        setConsultas(consultas.filter(consulta => consulta.id !== id));
                    })
                    .catch(error => console.log(error));

                swalWithBootstrapButtons.fire({
                    title: "Eliminar!",
                    text: "La consulta fue eliminada.",
                    icon: "success"
                });
                navigate('/invoices');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelar!",
                    text: "La consulta no fue eliminada.",
                    icon: "error"
                });
            }
        });

    };

    return (
        <>

            <div className="relative">

                <div className="text-3xl font-bold text-center mt-10">Consultas</div>
                <p className='text-center text-slate-400 mb-5'>Listado de Consultas</p>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-md sm:rounded-lg overflow-x-auto">

                    <BaseThead ths={columns} />
                    <tbody>
                        {
                            consultas?.map(consulta => (
                                <tr className="odd:bg-white even:bg-gray-50" key={consulta.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {consulta.id}
                                    </th>
                                    <td scope="row">
                                        {consulta.nombres}
                                    </td>
                                    <td className="px-6 py-4">
                                        {consulta.telefono}
                                    </td>
                                    <td className="px-6 py-4">
                                        {consulta.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {consulta.fechaSugerida}
                                    </td>
                                    <td className="px-6 py-4">
                                        {consulta.comentario}
                                    </td>
                                    <td className="px-6 py-4">
                                        {consulta.servicio.nombre}
                                    </td>
                                    <td className="px-6 py-4">
                                        {consulta.fechaResgistrada}
                                    </td>
                                    <td className="flex items-center justify-center px-6 py-4 gap-2">

                                        <Link href={`/consulta/${consulta.id}/view`}>
                                            <BaseButton
                                                bgColor="bg-blue-500 hover:bg-blue-700"
                                                label={<GrView />}
                                                classx="rounded-full \\"
                                            />
                                        </Link>

                                        <BaseButton
                                            bgColor="bg-red-500 hover:bg-red-700"
                                            label={<FaRegTrashAlt />}
                                            classx="rounded-full"
                                            onClick={() => handleDeleteConsulta(consulta.id)}
                                        />

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

export default ConsultaPage