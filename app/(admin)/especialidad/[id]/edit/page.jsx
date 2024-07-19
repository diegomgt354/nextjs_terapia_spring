'use client'

import BaseButton from '@/components/shared/BaseButton';
import BaseInput from '@/components/shared/BaseInput';
import BaseTextArea from '@/components/shared/BaseTextArea';
import EspecialidadService from '@/services/EspecialidadService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { TbChevronLeft } from 'react-icons/tb';

const EspecialidadEdit = ({ params }) => {

    const { id } = params;
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

    const updateEspecialidad = async (event) => {
        event.preventDefault();
        try {
            EspecialidadService.updateEspecialidad(id, JSON.stringify(form))
                .catch(error => console.log("error: " + error));
            console.log(form);
            setForm(INITIAL_FORM_VALUE);
            route.push('/especialidad')
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        EspecialidadService.getEspecialidad(id)
            .then(response => setForm(response.data))
            .catch(error => console.log(error));
    }, []);


    return (
        <>
            <Link href="/especialidad"
                className="font-bold flex gap-5 items-center">
                <TbChevronLeft />
                Go Back
            </Link>

            <div className="text-3xl font-bold text-center mt-10 mb-4">Editar Especialidad</div>
            <form className="max-w-sm mx-auto" onSubmit={(e) => updateEspecialidad(e)}>

                <BaseInput
                    label="Nombre"
                    placeholder="especialidad"
                    name="nombre"
                    onChange={handleChange}
                    value={form.nombre}
                />

                <BaseTextArea
                    label="Descripcion"
                    name="descripcion"
                    rows={4}
                    placeholder={'Describe la Especialidad...'}
                    onChange={handleChange}
                    value={form.descripcion}
                />

                <BaseButton
                    type='submit'
                    label='Editar'
                    bgColor='bg-yellow-500 hover:bg-yellow-700'
                    classx='w-full'
                />

            </form>

            {/* <div>{JSON.stringify(form, null, 2)}</div> */}
        </>
    )
}

export default EspecialidadEdit