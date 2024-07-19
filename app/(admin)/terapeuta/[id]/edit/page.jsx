'use client'

import BaseButton from '@/components/shared/BaseButton';
import BaseCheckboxList from '@/components/shared/BaseCheckboxList';
import BaseInput from '@/components/shared/BaseInput';
import BaseSelect from '@/components/shared/BaseSelect';
import BaseTextArea from '@/components/shared/BaseTextArea';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TerapeutaService from '@/services/TerapeutaService';
import React, { useEffect, useState } from 'react'
import { TbChevronLeft } from 'react-icons/tb';
import EspecialidadService from '@/services/EspecialidadService';
import ServicioService from '@/services/ServicioService';

const TerapeutaEdit = ({ params }) => {

    const { id } = params;

    const route = useRouter();

    const INITIAL_FORM_VALUE = {
        tipoDocumento: "",
        numeroDocumento: "",
        direccion: "",
        telefono: "",
        especialidad: 0,
        servicios: []
    }

    const listTipoDocumento = [
        { id: "DNI", nombre: "DNI" },
        { id: "CARNET EXTRANJERIA", nombre: "CARNET EXTRANJERIA" },
        { id: "PASAPORTE", nombre: "PASAPORTE" }];

    const [form, setForm] = useState(INITIAL_FORM_VALUE)
    const [especialidades, setEspecialidades] = useState([])
    const [servicios, setServicios] = useState([])

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    const handleCheckboxChange = (event) => {
        let { value } = event.target;
        const valueInt = parseInt(value);
        if (form.servicios.includes(valueInt)) {
            setForm({ ...form, servicios: form.servicios.filter(option => option !== valueInt) })
        } else {
            setForm({ ...form, servicios: [...form.servicios, valueInt] })
        }

    };


    const editTerapeuta = (event) => {
        event.preventDefault();
        try {
            TerapeutaService.updateTerapeuta(id, JSON.stringify(form))
                .catch(error => console.log("error: " + error));

            route.push('/terapeuta')
            // setForm(INITIAL_FORM_VALUE);

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        TerapeutaService.getTerapeuta(id)
            .then(response => {
                setForm(response.data)
                const { tipoDocumento, numeroDocumento, direccion, telefono, especialidad, servicios } = response.data
                setForm({ tipoDocumento, numeroDocumento, direccion, telefono, especialidad: especialidad.id, servicios: servicios.map(s => s.id) })
            });

        EspecialidadService.getEspecialidades()
            .then(response => setEspecialidades(response.data))

        ServicioService.getServicios()
            .then(response => setServicios(response.data))

    }, [])

    return (
        <>
            <Link href="/terapeuta"
                className="font-bold flex gap-5 items-center">
                <TbChevronLeft />
                Go Back
            </Link>

            <div className="text-3xl font-bold text-center mt-10 mb-4">Editar Terapeuta</div>
            <form className="max-w-sm mx-auto" onSubmit={(e) => editTerapeuta(e)}>

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

                <BaseTextArea
                    label="Direccion"
                    name="direccion"
                    rows={2}
                    placeholder={'Direccion'}
                    onChange={handleChange}
                    value={form.direccion}
                />

                <BaseInput
                    label="Numero de Telefono"
                    placeholder="Telefono"
                    name="telefono"
                    onChange={handleChange}
                    value={form.telefono}
                />

                <BaseSelect
                    label="Especialidad"
                    name="especialidad"
                    onChange={handleChange}
                    value={form.especialidad}
                    options={especialidades}
                />

                <BaseCheckboxList
                    label="Servicios"
                    onChange={handleCheckboxChange}
                    options={servicios}
                    // checkedsValues={form.servicios.map(option => option.id)}
                    checkedsValues={form.servicios}
                />
                <div>{form.servicios.map(option => option.id)}</div>
                <div>{JSON.stringify(form, null, 2)}</div>


                <BaseButton
                    type='submit'
                    label='Editar'
                    bgColor='bg-blue-500 hover:bg-blue-700'
                    classx='w-full'
                />

            </form>

        </>
    )
}

export default TerapeutaEdit