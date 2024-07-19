'use client'

import BaseButton from '@/components/shared/BaseButton'
import BaseInput from '@/components/shared/BaseInput'
import BaseSelect from '@/components/shared/BaseSelect'
import BaseTextArea from '@/components/shared/BaseTextArea'
import ConsultaService from '@/services/ConsultaService'
import ServicioService from '@/services/ServicioService'
import React, { useEffect, useState } from 'react'

const NewConsultaPage = () => {

    const INITIAL_FORM_VALUE = {
        nombres: '',
        telefono: '',
        email: '',
        fechaSugerida: '',
        comentario: '',
        servicio: '-1',
    }
    const [form, setForm] = useState(INITIAL_FORM_VALUE)
    const [services, setServices] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    const saveConsulta = (event) => {
        event.preventDefault();
        ConsultaService.saveConsulta(JSON.stringify(form))
            .catch(error => console.log(error));

        setForm(INITIAL_FORM_VALUE);
    }


    useEffect(() => {
        ServicioService.getServicios()
            .then(response => setServices(response.data.filter(service => service.estado == 1)))
            .catch(error => console.log(error));

    }, [form])

    return (
        <>
            <div className="text-3xl font-bold text-center mt-10">Consulta tus dudas</div>
            <p className='text-center text-slate-400 mb-5'>Nos contactaremos contigo lo mas antes posible !!!</p>
            <form className="max-w-sm mx-auto" onSubmit={(e) => saveConsulta(e)}>

                <BaseInput
                    label="Nombre"
                    placeholder="Diego Gutierrez Tafur"
                    name="nombres"
                    onChange={handleChange}
                    value={form.nombres}
                />

                <BaseInput
                    type='number'
                    label="Telefono"
                    placeholder="987654321"
                    name="telefono"
                    onChange={handleChange}
                    value={form.telefono}
                />

                <BaseInput
                    type='email'
                    label="Email"
                    placeholder="example@correo.com"
                    name="email"
                    onChange={handleChange}
                    value={form.email}
                />

                <BaseInput
                    type='datetime-local'
                    label="Fecha en la que desea ir a las citas"
                    name="fechaSugerida"
                    onChange={handleChange}
                    value={form.fechaSugerida}
                />

                <BaseTextArea
                    label="Comentario"
                    name="comentario"
                    rows={4}
                    placeholder={'Comenteme sus dudas...'}
                    onChange={handleChange}
                    value={form.comentario}
                />

                <BaseSelect
                    label="Selecciona un servicio"
                    name="servicio"
                    options={services}
                    onChange={handleChange}
                    value={form.servicio}
                />

                <BaseButton
                    type='submit'
                    label='Enviar'
                    bgColor='bg-blue-500 hover:bg-blue-700'
                    classx='w-full'
                />

            </form>

            <div>{JSON.stringify(form, null, 2)}</div>

        </>
    )
}

export default NewConsultaPage