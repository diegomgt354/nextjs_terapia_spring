'use client'

import BaseButton from '@/components/shared/BaseButton';
import BaseTag from '@/components/shared/BaseTag';
import BaseThead from '@/components/shared/BaseThead';
import UsuarioService from '@/services/UsuarioService';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { GrView } from 'react-icons/gr';

const UsuarioPage = () => {

    const [usuarios, setUsuarios] = useState([])
    const [cambio, setCambio] = useState(false)

    const columns = ['Id', 'Correo', 'Terapeuta', 'Rol', 'Estado', 'Acciones'];

    useEffect(() => {
        UsuarioService.getUsuarios()
            .then(response => setUsuarios(response.data))
            .catch(error => console.log(error));
    }, [cambio]);

    const handleActionServicio = async (id, estado) => {
        let request = null;
        if (estado === 'delete') {
            request = UsuarioService.deleteUsuario(id);
        } else {
            request = UsuarioService.recoverUsuario(id);
        }
        request
            .then(() => {
                setCambio(!cambio);
            })
            .catch(error => console.log(error));
    };

    const handleDeleteUsuarioPhysical = async (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "rounded-full px-5 py-2 font-semibold bg-red-400 hover:bg-red-500 mx-2",
                cancelButton: "rounded-full px-5 py-2 font-semibold bg-blue-400 hover:bg-blue-500"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Está seguro de eliminar el usuario?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "No, cancelar!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                // eliminamos el usuario
                UsuarioService.deleteUsuarioPhysical(id)
                    .then(() => {

                        swalWithBootstrapButtons.fire({
                            title: "Eliminar!",
                            text: "El Usuario fue eliminado.",
                            icon: "success"
                        });

                        setCambio(!cambio);
                    })
                    .catch(error => console.log(error));


            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelar!",
                    text: "El Usuario no fue eliminado.",
                    icon: "error"
                });
            }
        });

    };

    return (
        <>

            <div className="relative  ">

                <div className='flex justify-between items-center'>
                    <div></div>
                    <div>
                        <div className="text-3xl font-bold text-center mt-10">Usuarios</div>
                        <p className='text-center text-slate-400 mb-5'>Listado de Usuarios</p>
                    </div>
                    <Link href={'/usuario/create'}>
                        <BaseButton
                            bgColor="bg-blue-500 hover:bg-blue-700"
                            label="Agregar Usuario"
                            classx="rounded-full"
                        />
                    </Link>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-md sm:rounded-lg overflow-x-auto">

                    <BaseThead ths={columns} />

                    <tbody>
                        {
                            usuarios?.map(usuario => (
                                <tr className="odd:bg-white even:bg-gray-50" key={usuario.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {usuario.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {usuario.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {usuario.terapeuta?.nombres} {usuario.terapeuta?.apellido}
                                    </td>
                                    <td className="px-6 py-4">
                                        {usuario.roles[0].nombre}
                                    </td>
                                    <td className="px-6 py-4">
                                        <BaseTag status={usuario.estado} />
                                    </td>
                                    <td className="flex items-center justify-center px-6 py-4 gap-2">

                                        <Link href={`/usuario/${usuario.id}/edit`}>
                                            <BaseButton
                                                bgColor="bg-yellow-500 hover:bg-yellow-700"
                                                label={<FaRegEdit />}
                                                classx="rounded-full"
                                            />
                                        </Link>

                                        <Link href={`/usuario/${usuario.id}/view`}>
                                            <BaseButton
                                                bgColor="bg-blue-500 hover:bg-blue-700"
                                                label={<GrView />}
                                                classx="rounded-full"
                                            />
                                        </Link>


                                        {usuario.estado === 1 ? (
                                            <BaseButton
                                                bgColor="bg-red-500 hover:bg-red-700"
                                                label={<FaCircleXmark />}
                                                onClick={() => handleActionServicio(usuario.id, 'delete')}
                                                classx="rounded-full"
                                            />
                                        ) : (
                                            <BaseButton
                                                bgColor="bg-green-500 hover:bg-green-700"
                                                label={<FaCircleCheck />}
                                                onClick={() => handleActionServicio(usuario.id, 'recover')}
                                                classx="rounded-full"
                                            />
                                        )}

                                        <BaseButton
                                            bgColor="bg-red-500 hover:bg-red-700"
                                            label={<FaRegTrashAlt />}
                                            onClick={() => handleDeleteUsuarioPhysical(usuario.id)}
                                            classx="rounded-full"
                                        />

                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>



                </table>
                {/* <div>pass: {usuarios[1]?.password}</div> */}
                {/* <div>{JSON.stringify(usuarios, null, 2)}</div> */}
            </div>

        </>
    )
}

export default UsuarioPage