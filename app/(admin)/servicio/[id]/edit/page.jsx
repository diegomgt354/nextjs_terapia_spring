'use client'

import BaseButton from '@/components/shared/BaseButton'
import BaseInput from '@/components/shared/BaseInput'
import BaseTextArea from '@/components/shared/BaseTextArea'
import ServicioService from '@/services/ServicioService'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { TbChevronLeft } from 'react-icons/tb'

const ServicioEdit = ({ params }) => {

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

    const updateServicio = async (event) => {
        event.preventDefault();
        try {
            ServicioService.updateServicio(id, JSON.stringify(form))
                .catch(error => console.log("error: " + error));
            console.log(form);
            setForm(INITIAL_FORM_VALUE);
            route.push('/servicio')
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        ServicioService.getServicio(id)
            .then(response => setForm(response.data))
            .catch(error => console.log(error));
    }, []);


    return (
        <>
            <Link href="/servicio"
                className="font-bold flex gap-5 items-center">
                <TbChevronLeft />
                Go Back
            </Link>

            <div className="text-3xl font-bold text-center mt-10 mb-4">Editar Servicio</div>
            <form className="max-w-sm mx-auto" onSubmit={(e) => updateServicio(e)}>

                <BaseInput
                    label="Nombre"
                    placeholder="Servicio"
                    name="nombre"
                    onChange={handleChange}
                    value={form.nombre}
                />

                <BaseTextArea
                    label="Descripcion"
                    name="descripcion"
                    rows={4}
                    placeholder={'Describe el servicio...'}
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

            <div>{JSON.stringify(form, null, 2)}</div>
        </>
    )
}

export default ServicioEdit