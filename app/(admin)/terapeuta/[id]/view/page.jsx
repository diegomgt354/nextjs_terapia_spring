'use client'

import BaseTag from '@/components/shared/BaseTag';
import TerapeutaService from '@/services/TerapeutaService';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { TbChevronLeft } from 'react-icons/tb';

const TerapeutaView = ({ params }) => {

    const { id } = params;

    const [terapeuta, setTerapeuta] = useState({});

    useEffect(() => {
        TerapeutaService.getTerapeuta(id)
            .then(response => setTerapeuta(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <>

            <Link href={'/terapeuta'} className="font-bold flex gap-5 items-center">
                <TbChevronLeft className="text-slate-400" />
                Go back
            </Link>



            <div className="bg-white rounded-lg shadow-md p-8">
                <div className='flex justify-between items-center'>
                    <h3 className="text-lg font-medium mb-2">
                        <span className="text-3xl">Información del Terapeuta </span>
                        <p className="text-slate-400 text-sm">{terapeuta.dateCreate}</p>
                    </h3>
                    <BaseTag status={terapeuta.estado} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="">
                        <p className="text-sm font-bold">Nombre:</p>
                        <p className="text-sm">{terapeuta.nombres} {terapeuta.apellido}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Tipo Documento:</p>
                        <p className="text-sm">{terapeuta.tipoDocumento}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Numero Documento:</p>
                        <p className="text-sm">{terapeuta.numeroDocumento}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Direccion:</p>
                        <p className="text-sm">{terapeuta.direccion}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Fecha Modificada:</p>
                        <p className="text-sm">{terapeuta.dateModif === null ? 'Ninguna' : terapeuta.dateModif}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Fecha Deshabilida:</p>
                        <p className="text-sm">{terapeuta.dateDelet === null ? 'Ninguna' : terapeuta.dateDelet}</p>
                    </div>

                    <div>
                        <p className="text-sm font-bold">Servicios:</p>
                        <div className='rounded-lg shadow-md p-8'>
                            <div className='text-sm text-gray-500 flex flex-col gap-2'>
                                {
                                    terapeuta.servicios?.map((servicio) => (
                                        <div className="flex items-center"
                                            key={servicio.id}>

                                            <svg className={`w-3.5 h-3.5 me-2 ${servicio.estado === 1 ? 'text-green-500' : 'text-gray-500'} flex-shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            {servicio.nombre}
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </div>

                    <div className="">
                        <p className="text-sm font-bold">Especialidad:</p>
                        <div className={`rounded-lg shadow-md p-8 ${terapeuta.especialidad?.estado === 1 ? 'bg-green-200' : 'bg-red-200'}`}>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <p className="text-sm font-bold">Nombre:</p>
                                    <p className="text-sm">{terapeuta.especialidad?.nombre}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Descripcion:</p>
                                    <p className="text-sm">{terapeuta.especialidad?.descripcion}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div>{JSON.stringify(terapeuta, null, 2)}</div>

        </>
    )
}

export default TerapeutaView