'use client'

import BaseButton from '@/components/shared/BaseButton'
import BaseInput from '@/components/shared/BaseInput'
import BaseSelect from '@/components/shared/BaseSelect'
import BaseTag from '@/components/shared/BaseTag'
import BaseTextArea from '@/components/shared/BaseTextArea'
import BaseToggleSwitch from '@/components/shared/BaseToggleSwitch'
import CitaService from '@/services/CitaService'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { TbChevronLeft } from 'react-icons/tb'

const CitaEdit = ({ params }) => {
    const { id } = params

    const route = useRouter()

    const INITIAL_FORM_VALUE = {
        fecha: '',
        comentario: '',
        paciente: '0',
        terapeuta: '0',
        servicio: '0'
    }

    const [form, setForm] = useState(INITIAL_FORM_VALUE)
    const [estado, setEstado] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    const updateCita = (event) => {
        event.preventDefault();
        try {
            CitaService.updateCita(id, JSON.stringify(form))
                .catch(error => console.log("error: " + error));
            route.push('/pendiente')
            setForm(INITIAL_FORM_VALUE);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        CitaService.getCita(id)
            .then(response => {
                const { fecha, comentario, paciente, terapeuta, servicio, estado } = response.data
                setForm({ fecha, comentario, paciente: paciente.id, terapeuta: terapeuta.id, servicio: servicio.id })
                setEstado(estado)
            });

    }, [])


    return (
        <>
            <Link href="/usuario"
                className="font-bold flex gap-5 items-center">
                <TbChevronLeft />
                Go Back
            </Link>
            <form className="mx-auto" onSubmit={(e) => updateCita(e)}>

                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className='flex justify-between items-center'>
                        <h3 className="text-lg font-medium mb-2">
                            <span className="text-3xl">Información de la Cita </span>
                            <p className="text-slate-400 text-sm">{form.dateCreate}</p>
                        </h3>
                        <BaseTag status={estado} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="">
                            <p className="text-sm font-bold">Fecha Asignada:</p>
                            <p className="text-sm">{form.dateModif}</p>
                        </div>
                        <div className="">
                            <p className="text-sm font-bold">Paciente:</p>
                            <p className="text-sm">{form.paciente?.nombres} {form.paciente?.apellido}</p>
                        </div>
                        <div className="">
                            <p className="text-sm font-bold">Servicio:</p>
                            <p className="text-sm">{form.servicio?.nombre}</p>
                        </div>
                        <BaseTextArea
                            label="Comentario de la Cita"
                            name="comentario"
                            rows={4}
                            placeholder={'Ingresa un comentario de la Cita'}
                            onChange={handleChange}
                            value={form.comentario}
                        />
                        <div></div>
                        <BaseButton
                            type='submit'
                            label='Agregar Comentario'
                            bgColor='bg-blue-500 hover:bg-blue-700'
                            classx='w-full'
                        />

                    </div>
                </div>
            </form>





            <div>{JSON.stringify(form, null, 2)}</div>
        </>
    )
}

export default CitaEdit