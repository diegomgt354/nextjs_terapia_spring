'use client'

import BaseButton from '@/components/shared/BaseButton';
import BaseInput from '@/components/shared/BaseInput';
import BaseSelect from '@/components/shared/BaseSelect';
import PacienteService from '@/services/PacienteService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { TbChevronLeft } from 'react-icons/tb';

const PacienteEdit = ({ params }) => {

    const { id } = params

    const route = useRouter();

    const INITIAL_FORM_VALUE = {
        tipoDocumento: "",
        numeroDocumento: "",
        telefono: "",
        email: "",
        genero: "",
        dateNacimiento: "",
    }

    const listGenero = [
        { id: "MASCULINO", nombre: "MASCULINO" },
        { id: "FEMENINO", nombre: "FEMENINO" },
        { id: "BINARIO", nombre: "BINARIO" },
        { id: "OTROS", nombre: "OTROS" }];

    const listTipoDocumento = [
        { id: "DNI", nombre: "DNI" },
        { id: "CARNET EXTRANJERIA", nombre: "CARNET EXTRANJERIA" },
        { id: "PASAPORTE", nombre: "PASAPORTE" }];

    const [form, setForm] = useState(INITIAL_FORM_VALUE)

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    const updatePaciente = (event) => {
        event.preventDefault();
        try {
            PacienteService.updatePaciente(id, JSON.stringify(form))
                .catch(error => console.log("error: " + error));

            route.push('/paciente')
            // setForm(INITIAL_FORM_VALUE);

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        PacienteService.getPaciente(id)
            .then(response => setForm(response.data));

    }, [])



    return (
        <>
            <Link href="/paciente"
                className="font-bold flex gap-5 items-center">
                <TbChevronLeft />
                Go Back
            </Link>

            <div className="text-3xl font-bold text-center mt-10 mb-4">Editar Paciente</div>
            <form className="max-w-sm mx-auto" onSubmit={(e) => updatePaciente(e)}>

                <BaseSelect
                    label="Tipo Documento"
                    name="tipoDocumento"
                    onChange={handleChange}
                    value={form.tipoDocumento}
                    options={listTipoDocumento}
                />

                <BaseInput
                    type='number'
                    label="Numero Documento"
                    placeholder="Numero Documento"
                    name="numeroDocumento"
                    onChange={handleChange}
                    value={form.numeroDocumento}
                />

                <BaseInput
                    label="Numero de Telefono"
                    placeholder="Telefono"
                    name="telefono"
                    onChange={handleChange}
                    value={form.telefono}
                />

                <BaseInput
                    label="Correo Electronico"
                    placeholder="Correo Electronico"
                    name="email"
                    onChange={handleChange}
                    value={form.email}
                />

                <BaseSelect
                    label="Genero"
                    name="genero"
                    onChange={handleChange}
                    value={form.genero}
                    options={listGenero}
                />

                <BaseInput
                    type='date'
                    label="Fecha de Nacimiento"
                    placeholder="Fecha de Nacimiento"
                    name="dateNacimiento"
                    onChange={handleChange}
                    value={form.dateNacimiento}
                />


                <BaseButton
                    type='submit'
                    label='Editar'
                    bgColor='bg-blue-500 hover:bg-blue-700'
                    classx='w-full'
                />

            </form>

            <div>{JSON.stringify(form, null, 2)}</div>
        </>
    )
}

export default PacienteEdit