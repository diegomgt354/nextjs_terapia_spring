'use client'

import NavbarUser from '@/components/navbar/NavbarUser'
import TokenAux from '@/services/TokenAux';
import { useRouter } from 'next/navigation';
import React from 'react'

const UserLayout = ({ children }) => {

    const route = useRouter();

    const token = TokenAux();

    const auth = { 'token': token.existToken() }

    const information = token.getInformation();

    const roles = information?.roles[0].nombre;

    const rol = roles == 'ADMIN' ? 'ADMINISTRADOR' : 'USUARIO';

    return (
        auth.token ? (

            roles == 'USER' ? (
                <section className="pt-20 mx-40">
                    <NavbarUser
                        sub={information.sub}
                        nombres={information.nombres}
                        estado={information.estado}
                        rol={rol}
                    />
                    {children}
                </section>
            ) : (
                route.push('/consulta')
            )

        ) : (
            route.push('/')
        )
    )
}

export default UserLayout