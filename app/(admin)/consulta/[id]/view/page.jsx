'use client'

import ConsultaService from '@/services/ConsultaService';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { TbChevronLeft } from 'react-icons/tb';

const ConsultaView = () => {

    const { id } = useParams();

    const [consulta, setConsulta] = useState({});

    useEffect(() => {
        ConsultaService.getConsulta(id)
            .then(response => setConsulta(response.data))
            .catch(error => console.log(error));
    }, [id]);

    return (

        <>

            <Link href={'/consulta'} className="font-bold flex gap-5 items-center">
                <TbChevronLeft className="text-slate-400" />
                Go back
            </Link>


            {/* <div>{JSON.stringify(consulta, null, 2)}</div> */}

            <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-lg font-medium mb-2">
                    <span className="text-3xl">Información de la consulta </span>
                    <p className="text-slate-400 text-sm">{consulta.fechaResgistrada}</p>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="">
                        <p className="text-sm font-bold">Nombres:</p>
                        <p className="text-sm">{consulta.nombres}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Teléfono:</p>
                        <p className="text-sm">{consulta.telefono}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Correo electrónico:</p>
                        <p className="text-sm">{consulta.email}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Fecha sugerida:</p>
                        <p className="text-sm">{consulta.fechaSugerida}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Comentario:</p>
                        <p className="text-sm">{consulta.comentario}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Servicio:</p>
                        <p className="text-sm">{consulta.servicio?.nombre}</p>
                    </div>
                </div>
            </div>



        </>
    )
}

export default ConsultaView