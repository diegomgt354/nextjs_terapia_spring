'use client'

import BaseButton from '@/components/shared/BaseButton'
import BaseInput from '@/components/shared/BaseInput'
import BaseInputv2 from '@/components/shared/BaseInputv2'
import BaseSelect from '@/components/shared/BaseSelect'
import BaseSelectv2 from '@/components/shared/BaseSelectv2'
import BaseTextArea from '@/components/shared/BaseTextArea'
import BaseToggleSwitch from '@/components/shared/BaseToggleSwitch'
import BaseToggleSwitchv2 from '@/components/shared/BaseToggleSwitchv2'
import TerapeutaService from '@/services/TerapeutaService'
import UsuarioService from '@/services/UsuarioService'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TbChevronLeft } from 'react-icons/tb'

const UsuarioCreate = ({ params }) => {

    const { id } = params

    const { register, handleSubmit } = useForm();

    const route = useRouter()

    const INITIAL_FORM_VALUE = {
        email: '',
        password: '',
        terapeuta: -1,
        rol: 'USER'
    }

    const [form, setForm] = useState(INITIAL_FORM_VALUE)
    const [terapeutas, setTerapeutas] = useState([])

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    const handleChangeUser = (event) => {
        const { checked, name } = event.target;
        let value = "USER"
        if (checked) {
            value = "ADMIN"
        }
        setForm({ ...form, [name]: value })
    }

    const saveUsuario = async (event) => {
        // event.preventDefault();
        console.log("ddsdsdsd")
        console.log(event)
        // try {
        //     UsuarioService.saveUsuario(JSON.stringify(form))
        //         .catch(error => console.log("error: " + error));
        //     route.push('/usuario')
        //     setForm(INITIAL_FORM_VALUE);
        // } catch (error) {
        //     console.log(error);
        // }

    }

    useEffect(() => {
        TerapeutaService.getTerapeutas()
            .then(response => setTerapeutas(response.data))

    }, [])

    return (
        <>
            <Link href="/usuario"
                className="font-bold flex gap-5 items-center">
                <TbChevronLeft />
                Go Back
            </Link>

            <div className="text-3xl font-bold text-center mt-10 mb-4">Agregar Usuario</div>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit(saveUsuario)}>

                <BaseInputv2
                    type='email'
                    label="Email"
                    placeholder="Email"
                    name="email"
                    // onChange={handleChange}
                    // value={form.email}
                    register={register}
                    required
                />

                <BaseInputv2
                    label="Password"
                    name="password"
                    placeholder={'Password'}
                    // onChange={handleChange}
                    // value={form.password}
                    register={register}
                    required
                />

                <BaseSelectv2
                    label="Terapeuta"
                    name="terapeuta"
                    onChange={handleChange}
                    // value={form.terapeuta}
                    register={register}
                    options={terapeutas}
                // selected={form.terapeuta}
                />

                <BaseToggleSwitchv2
                    value={form.rol}
                    name='rol'
                    label="Administrador"
                    // valueActivate="ADMIN"
                    register={register}
                // onChange={handleChangeUser}
                />

                <BaseButton
                    type='submit'
                    label='Agregar'
                    bgColor='bg-blue-500 hover:bg-blue-700'
                    classx='w-full'
                />



            </form>

            <div>{JSON.stringify(form, null, 2)}</div>
            {/* <div>{JSON.stringify(terapeutas, null, 2)}</div> */}
        </>
    )
}

export default UsuarioCreate