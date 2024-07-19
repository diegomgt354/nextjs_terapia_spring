'use client'

import BaseButton from '@/components/shared/BaseButton';
import BaseInput from '@/components/shared/BaseInput';
import BaseTextArea from '@/components/shared/BaseTextArea';
import EspecialidadService from '@/services/EspecialidadService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { TbChevronLeft } from 'react-icons/tb';

const EspecialidadCreate = () => {

    const route = useRouter();

    const INITIAL_FORM_VALUE = {
        nombre: '',
        descripcion: ''
    }

    const [form, setForm] = useState(INITIAL_FORM_VALUE)

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    const saveEspecialidad = (event) => {
        event.preventDefault();
        try {
            EspecialidadService.saveEspecialidad(JSON.stringify(form))
                .catch(error => console.log("error: " + error));
            route.push('/especialidad')
            setForm(INITIAL_FORM_VALUE);
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <>
            <Link href="/especialidad"
                className="font-bold flex gap-5 items-center">
                <TbChevronLeft />
                Go Back
            </Link>

            <div className="text-3xl font-bold text-center mt-10 mb-4">Agregar Especialidad</div>
            <form className="max-w-sm mx-auto" onSubmit={(e) => saveEspecialidad(e)}>

                <BaseInput
                    label="Nombre"
                    placeholder="Especialidad"
                    name="nombre"
                    onChange={handleChange}
                    value={form.nombre}
                />

                <BaseTextArea
                    label="Descripcion"
                    name="descripcion"
                    rows={4}
                    placeholder={'Describe de la especialidad...'}
                    onChange={handleChange}
                    value={form.descripcion}
                />

                <BaseButton
                    type='submit'
                    label='Agregar'
                    bgColor='bg-blue-500 hover:bg-blue-700'
                    classx='w-full'
                />

            </form>

            <div>{JSON.stringify(form, null, 2)}</div>
        </>
    )
}

export default EspecialidadCreate