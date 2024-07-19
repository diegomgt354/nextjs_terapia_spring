'use client'

import BaseTag from '@/components/shared/BaseTag'
import UsuarioService from '@/services/UsuarioService'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { TbChevronLeft } from 'react-icons/tb'

const UsuarioView = ({ params }) => {

    const { id } = params

    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        UsuarioService.getUsuario(id)
            .then(response => setUsuario(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <>

            <Link href={'/usuario'} className="font-bold flex gap-5 items-center">
                <TbChevronLeft className="text-slate-400" />
                Go back
            </Link>



            <div className="bg-white rounded-lg shadow-md p-8">
                <div className='flex justify-between items-center'>
                    <h3 className="text-lg font-medium mb-2">
                        <span className="text-3xl">Información del Terapeuta </span>
                        <p className="text-slate-400 text-sm">{usuario.dateCreate}</p>
                    </h3>
                    <BaseTag status={usuario.estado} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="">
                        <p className="text-sm font-bold">Rol:</p>
                        <p className="text-sm">{usuario.roles?.map(role => role.nombre)}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Email:</p>
                        <p className="text-sm">{usuario.email}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Terapeuta:</p>
                        <p className="text-sm">{usuario.terapeuta?.nombres} {usuario.terapeuta?.apellido}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Fecha Modificada:</p>
                        <p className="text-sm">{usuario.dateModif === null ? 'Ninguna' : usuario.dateModif}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Fecha Deshabilida:</p>
                        <p className="text-sm">{usuario.dateDelet === null ? 'Ninguna' : usuario.dateDelet}</p>
                    </div>

                </div>
            </div>

            <div>{JSON.stringify(usuario, null, 2)}</div>

        </>
    )
}

export default UsuarioView