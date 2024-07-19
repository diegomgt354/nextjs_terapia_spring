'use client'

import BaseTag from '@/components/shared/BaseTag';
import EspecialidadService from '@/services/EspecialidadService';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { TbChevronLeft } from 'react-icons/tb';

const EspecialidadView = ({ params }) => {

    const { id } = params;

    const [especialidad, setEspecialidad] = useState({});

    useEffect(() => {
        EspecialidadService.getEspecialidad(id)
            .then(response => setEspecialidad(response.data))
            .catch(error => console.log(error));
    }, []);



    return (
        <>

            <Link href={'/especialidad'} className="font-bold flex gap-5 items-center">
                <TbChevronLeft className="text-slate-400" />
                Go back
            </Link>



            <div className="bg-white rounded-lg shadow-md p-8">
                <div className='flex justify-between items-center'>
                    <h3 className="text-lg font-medium mb-2">
                        <span className="text-3xl">Información de la Especialidad </span>
                        <p className="text-slate-400 text-sm">{especialidad.dateCreate}</p>
                    </h3>
                    <BaseTag status={especialidad.estado} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="">
                        <p className="text-sm font-bold">Nombre:</p>
                        <p className="text-sm">{especialidad.nombre}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Descripcion:</p>
                        <p className="text-sm">{especialidad.descripcion}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Fecha Modificada:</p>
                        <p className="text-sm">{especialidad.dateModif === null ? 'Ninguna' : especialidad.dateModif}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Fecha Deshabilida:</p>
                        <p className="text-sm">{especialidad.dateDelet === null ? 'Ninguna' : especialidad.dateDelet}</p>
                    </div>
                </div>
            </div>

            {/* <div>{JSON.stringify(especialidad, null, 2)}</div> */}

        </>
    )
}

export default EspecialidadView