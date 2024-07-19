'use client'

import NavbarAdmin from '@/components/navbar/NavbarAdmin'
import TokenAux from '@/services/TokenAux'
import { useRouter } from 'next/navigation';
import React from 'react'

const AdminLayout = ({ children }) => {

    const route = useRouter();

    const token = TokenAux();

    const auth = { 'token': token.existToken() }

    const information = token.getInformation();

    const roles = information?.roles[0].nombre;

    const rol = roles == 'ADMIN' ? 'ADMINISTRADOR' : 'USUARIO';

    return (
        auth.token ? (

            roles == 'ADMIN' ? (
                <section className="pt-20 mx-40">
                    <NavbarAdmin
                        sub={information.sub}
                        nombres={information.nombres}
                        estado={information.estado}
                        rol={rol}
                    />
                    {children}
                </section>
            ) : (
                route.push('/pendiente')
            )

        ) : (
            route.push('/')
        )
    )
}

export default AdminLayout