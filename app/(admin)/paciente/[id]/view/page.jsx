'use client'

import BaseTag from '@/components/shared/BaseTag';
import PacienteService from '@/services/PacienteService';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { TbChevronLeft } from 'react-icons/tb';

const PacienteView = ({ params }) => {

    const { id } = params;

    const [paciente, setPaciente] = useState({});

    useEffect(() => {
        PacienteService.getPaciente(id)
            .then(response => setPaciente(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <>

            <Link href={'/paciente'} className="font-bold flex gap-5 items-center">
                <TbChevronLeft className="text-slate-400" />
                Go back
            </Link>

            <div className="bg-white rounded-lg shadow-md p-8">
                <div className='flex justify-between items-center'>
                    <h3 className="text-lg font-medium mb-2">
                        <span className="text-3xl">Información del Paciente </span>
                        <p className="text-slate-400 text-sm">{paciente.dateCreate}</p>
                    </h3>
                    <BaseTag status={paciente.estado} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="">
                        <p className="text-sm font-bold">Nombre:</p>
                        <p className="text-sm">{paciente.nombres} {paciente.apellido}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Tipo Documento:</p>
                        <p className="text-sm">{paciente.tipoDocumento}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Numero Documento:</p>
                        <p className="text-sm">{paciente.numeroDocumento}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Telefono:</p>
                        <p className="text-sm">{paciente.telefono}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Email:</p>
                        <p className="text-sm">{paciente.email}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Genero:</p>
                        <p className="text-sm">{paciente.genero}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">F Nacimiento:</p>
                        <p className="text-sm">{paciente.dateNacimiento}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Fecha Modificada:</p>
                        <p className="text-sm">{paciente.dateModif === null ? 'Ninguna' : paciente.dateModif}</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-bold">Fecha Deshabilida:</p>
                        <p className="text-sm">{paciente.dateDelet === null ? 'Ninguna' : paciente.dateDelet}</p>
                    </div>

                </div>
            </div>

            <div>{JSON.stringify(paciente, null, 2)}</div>

        </>
    )
}

export default PacienteView