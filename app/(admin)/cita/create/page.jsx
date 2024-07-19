'use client'

import BaseButton from '@/components/shared/BaseButton';
import BaseInput from '@/components/shared/BaseInput';
import BaseTextArea from '@/components/shared/BaseTextArea';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { TbChevronLeft } from 'react-icons/tb';
import CitaService from '@/services/CitaService';
import BaseSelect from '@/components/shared/BaseSelect';
import PacienteService from '@/services/PacienteService';
import TerapeutaService from '@/services/TerapeutaService';
import Link from 'next/link';
import ServicioService from '@/services/ServicioService';

const CitaCreate = () => {

    const route = useRouter();

    const INITIAL_FORM_VALUE = {
        fecha: '',
        comentario: '',
        paciente: '',
        terapeuta: '',
        servicio: ''
    }

    const [form, setForm] = useState(INITIAL_FORM_VALUE)
    const [pacientes, setPacientes] = useState([])
    const [terapeutas, setTerapeutas] = useState([])
    const [servicios, setServicios] = useState([])

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    const saveCita = (event) => {
        event.preventDefault();
        try {
            CitaService.saveCita(JSON.stringify(form))
                .catch(error => console.log("error: " + error));
            route.push('/cita')
        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        PacienteService.getPacientes()
            .then(response => setPacientes(response.data))
            .catch(error => console.log("error: " + error));

        TerapeutaService.getTerapeutas()
            .then(response => setTerapeutas(response.data))
            .catch(error => console.log("error: " + error));

        ServicioService.getServicios()
            .then(response => setServicios(response.data))
            .catch(error => console.log("error: " + error));
    }, [])

    return (
        <>
            <Link href="/cita"
                className="font-bold flex gap-5 items-center">
                <TbChevronLeft />
                Go Back
            </Link>

            <div className="text-3xl font-bold text-center mt-10 mb-4">Agregar Cita</div>
            <form className="max-w-sm mx-auto" onSubmit={(e) => saveCita(e)}>

                <BaseInput
                    type='datetime-local'
                    label="Fecha de la cita"
                    name="fecha"
                    onChange={handleChange}
                    value={form.fecha}
                />

                <BaseTextArea
                    label="Comentario"
                    name="comentario"
                    rows={4}
                    placeholder={'Ingresa un comentario...'}
                    onChange={handleChange}
                    value={form.comentario}
                />

                <BaseSelect
                    label="Paciente"
                    name="paciente"
                    onChange={handleChange}
                    value={form.paciente}
                    options={pacientes}
                    selected={form.paciente}
                />

                <BaseSelect
                    label="Terapeutas"
                    name="terapeuta"
                    onChange={handleChange}
                    value={form.terapeuta}
                    options={terapeutas}
                    selected={form.terapeuta}
                />

                <BaseSelect
                    label="Servicio"
                    name="servicio"
                    onChange={handleChange}
                    value={form.servicio}
                    options={servicios}
                    selected={form.servicio}
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

export default CitaCreate