'use client'

import BaseButton from '@/components/shared/BaseButton'
import BaseInput from '@/components/shared/BaseInput'
import AuthenticationService from '@/services/AuthenticationService'
import TokenAux from '@/services/TokenAux'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginPage = () => {

    const tokenAux = TokenAux();

    const route = useRouter();

    const INITIAL_FORM_VALUE = {
        email: '',
        password: ''
    }

    const [form, setForm] = useState(INITIAL_FORM_VALUE);
    // const [usuario, setUsuario] = useState([]);
    const handleChange = (event) => {
        const { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    const signIn = (event) => {
        event.preventDefault()
        AuthenticationService.signIn(form)
            .then(response => {
                // setUsuario(response.data)
                tokenAux.setToken(response.data.token);
                const rol = tokenAux.getInformation().roles[0].nombre;
                if (rol === 'ADMIN') {
                    route.push('/consulta');
                } else {
                    route.push('/pendiente');
                }
            })
            .catch(error => console.log(error));
    }


    return (
        <>
            <div className="flex flex-col gap-5">

                <h1 className="text-3xl font-bold text-center mt-10">Login</h1>

                <form className="max-w-sms mx-auto" onSubmit={e => signIn(e)}>

                    <BaseInput
                        type='email'
                        label="Email"
                        placeholder="name@flowbite.com"
                        name="email"
                        onChange={handleChange}
                        value={form.email}
                    />

                    <BaseInput
                        type='password'
                        label="Password"
                        placeholder="•••••••••••••"
                        name="password"
                        onChange={handleChange}
                        value={form.password}
                    />

                    <BaseButton
                        type='submit'
                        label='Ingresar'
                        bgColor='bg-blue-500 hover:bg-blue-700'
                        classx='w-full'
                    />

                </form>

            </div>

            <div>{JSON.stringify(form, null, 2)}</div>
            {/* <div>{JSON.stringify(usuario, null, 2)}</div> */}

        </>
    )
}

export default LoginPage