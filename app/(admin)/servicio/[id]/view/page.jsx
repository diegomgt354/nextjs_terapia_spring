'use client'

import BaseTag from '@/components/shared/BaseTag';
import ServicioService from '@/services/ServicioService';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { TbChevronLeft } from 'react-icons/tb';

const ServicioView = ({ params }) => {

    const { id } = params;

    const [servicio, setServicio] = useState({});

    useEffect(() => {
        ServicioService.getServicio(id)
            .then(response => setServicio(response.data))
            .catch(error => console.log(error));
    }, []);


    return (
        <>

            <Link href={'/servicio'} className="font-bold flex gap-5 items-center">
                <TbChevronLeft className="text-slate-400" />
                Go back
            </Link>



            <div className="bg-white rounded-lg shadow-md p-8">
                <div className='flex justify-between items-center'>
                    <h3 className="text-lg font-medium mb-2">
                        <span className="text-3xl">Información del Servicio </span>
                        <p className="text-slate-400 text-sm">{servicio.dateCreate}</p>
                    </h3>
                    <BaseTag status={servicio.estado} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="">
                        <p className="text-sm font-bold">Nombre:</p>
                        <p className="text-sm">{servicio.nombre}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Descripcion:</p>
                        <p className="text-sm">{servicio.descripcion}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Fecha Modificada:</p>
                        <p className="text-sm">{servicio.dateModif === null ? 'Ninguna' : servicio.dateModif}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Fecha Deshabilida:</p>
                        <p className="text-sm">{servicio.dateDelet === null ? 'Ninguna' : servicio.dateDelet}</p>
                    </div>
                </div>
            </div>

            {/* <div>{JSON.stringify(servicio, null, 2)}</div> */}

        </>
    )
}

export default ServicioView