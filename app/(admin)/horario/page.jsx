'use client'

import BaseButton from '@/components/shared/BaseButton'
import BaseInput from '@/components/shared/BaseInput'
import BaseSelect from '@/components/shared/BaseSelect'
import BaseTag from '@/components/shared/BaseTag'
import BaseThead from '@/components/shared/BaseThead'
import HorarioService from '@/services/HorarioService'
import TerapeutaService from '@/services/TerapeutaService'
import React, { useEffect, useState } from 'react'
import { FaCircleCheck, FaCircleXmark, FaFloppyDisk } from 'react-icons/fa6'
import { GrView } from 'react-icons/gr'
import { Link } from 'react-router-dom'

const HorarioPage = () => {

    const columns = ['Dia', '1era Hora Inicio', '1era Hora Fin', '2da Hora Inicio', '2da Hora Fin', 'Estado', 'Acciones'];

    const horas = [
        { id: 8, nombre: "08:00" },
        { id: 8.5, nombre: "08:30" },
        { id: 9, nombre: "09:00" },
        { id: 9.5, nombre: "09:30" },
        { id: 10, nombre: "10:00" },
        { id: 10.5, nombre: "10:30" },
        { id: 11, nombre: "11:00" },
        { id: 11.5, nombre: "11:30" },
        { id: 12, nombre: "12:00" },
        { id: 12.5, nombre: "12:30" },
        { id: 13, nombre: "13:00" },
        { id: 13.5, nombre: "13:30" },
        { id: 14, nombre: "14:00" },
        { id: 14.5, nombre: "14:30" },
        { id: 15, nombre: "15:00" },
        { id: 15.5, nombre: "15:30" },
        { id: 16, nombre: "16:00" },
        { id: 16.5, nombre: "16:30" },
        { id: 17, nombre: "17:00" },
        { id: 17.5, nombre: "17:30" },
        { id: 18, nombre: "18:00" },
        { id: 18.5, nombre: "18:30" },
        { id: 19, nombre: "19:00" },
        { id: 19.5, nombre: "19:30" },
        { id: 20, nombre: "20:00" }
    ];

    const INITIAL_FORM_VALUE = {
        terapeuta: ''
    }

    const INICIAL_FORM_VALUE_HORARIO = {
        dia: "",
        horaInicioPrimerTurno: 0,
        horaSalidaPrimerTurno: 0,
        horaInicioSegundoTurno: 0,
        horaSalidaSegundoTurno: 0,
        terapeuta: -1
    }

    const [terapeutas, setTerapeutas] = useState([])
    const [cambio, setCambio] = useState(false)
    const [horario, setHorario] = useState(null)
    const [form, setForm] = useState(INICIAL_FORM_VALUE_HORARIO)
    const [terapeuta, setTerapeuta] = useState(INITIAL_FORM_VALUE)
    const [horarios, setHorarios] = useState([])

    // useEffect(() => {
    //     HorarioService.getHorarios()
    //         .then(response => setHorarios(response.data))
    //         .catch(error => console.log(error));
    // }, [cambio]);

    // generar un api para obtener el horario por el id del terapeuta
    useEffect(() => {
        HorarioService.getHorarioTherapist(terapeuta.terapeuta)
            .then(response => setHorario(response.data))
            .catch(error => console.log(error));
        console.log(terapeuta.terapeuta)
    }, [terapeuta.terapeuta, cambio]);

    useEffect(() => {
        TerapeutaService.getTerapeutas()
            .then(response => setTerapeutas(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleChangeTerapeuta = (event) => {
        const { name, value } = event.target
        setTerapeuta({ ...terapeuta, [name]: value })
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        console.log(event)
        setForm({ ...form, [name]: value })
    }


    const handlerObtainHorarioById = async (id) => {
        HorarioService.getHorario(id)
            .then(response => setHorario(response.data))
            .catch(error => console.log(error));
    };

    const handleActionServicio = async (id, estado) => {
        let request = null;
        if (estado === 'delete') {
            request = HorarioService.recoverHorario(id);
        } else {
            request = HorarioService.recoverPaciente(id);
        }
        request
            .then(() => {
                setCambio(!cambio);
            })
            .catch(error => console.log(error));
    };


    return (
        <>

            <div className="relative  ">

                <div className='flex justify-between items-center'>
                    <div></div>
                    <div>
                        <div className="text-3xl font-bold text-center mt-10">Horarios</div>
                        <p className='text-center text-slate-400 mb-5'>Listado de Horarios</p>
                    </div>
                    <BaseSelect
                        onChange={handleChangeTerapeuta}
                        name="terapeuta"
                        label="Terapeutas"
                        value={terapeuta.terapeuta}
                        options={terapeutas}
                    />

                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-md sm:rounded-lg overflow-x-auto">

                    <BaseThead ths={columns} />

                    <tbody>
                        {
                            horario?.map((h) => {

                                return (

                                    <tr className="odd:bg-white even:bg-gray-50" key={h.id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {h.dia}
                                        </th>

                                        <td className="px-6 py-4">
                                            <BaseSelect
                                                onChange={handleChange}
                                                name="horaInicioPrimerTurno"
                                                // value={form.horaInicioPrimerTurno}
                                                selected={h.horaInicioPrimerTurno}
                                                options={horas}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <BaseSelect
                                                onChange={handleChange}
                                                name="horaSalidaPrimerTurno"
                                                // value={form.horario}
                                                selected={h.horaSalidaPrimerTurno}
                                                options={horas}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <BaseSelect
                                                // onChange={handleChange}
                                                name="horaInicioSegundoTurno"
                                                // value={form.horario}
                                                selected={h.horaInicioSegundoTurno}
                                                options={horas}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <BaseSelect
                                                onChange={handleChange}
                                                name="horaSalidaSegundoTurno"
                                                // value={form.horaSalidaSegundoTurno}
                                                selected={h.horaSalidaSegundoTurno}
                                                options={horas}
                                            />
                                        </td>

                                        <td className="px-6 py-4">
                                            <BaseTag status={h.estado} />
                                        </td>
                                        <td className="flex items-center justify-center px-6 py-4 gap-2">

                                            <BaseButton
                                                bgColor="bg-blue-500 hover:bg-blue-700"
                                                label={<FaFloppyDisk />}
                                                onClick={() => console.log(h.id, form.horaSalidaSegundoTurno)}
                                                classx="rounded-full"
                                            />

                                            {horario?.estado === 1 ? (
                                                <BaseButton
                                                    bgColor="bg-red-500 hover:bg-red-700"
                                                    label={<FaCircleXmark />}
                                                    onClick={() => handleActionServicio(h.id, 'delete')}
                                                    classx="rounded-full"
                                                />
                                            ) : (
                                                <BaseButton
                                                    bgColor="bg-green-500 hover:bg-green-700"
                                                    label={<FaCircleCheck />}
                                                    onClick={() => handleActionServicio(h.id, 'recover')}
                                                    classx="rounded-full"
                                                />
                                            )}

                                        </td>
                                    </tr>

                                )
                            })

                        }


                    </tbody>
                </table>
            </div>
            <div>{JSON.stringify(horario, null, 2)}</div>

        </>
    )
}

export default HorarioPage