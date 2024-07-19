'use client'

import NavbarRoot from "@/components/navbar/NavbarRoot"
import TokenAux from "@/services/TokenAux";
import { useRouter } from "next/navigation";

const FreeLayout = ({ children }) => {

    const route = useRouter();

    const token = TokenAux();

    const auth = { 'token': token.existToken() }

    return (
        auth.token != true ? (
            <section className="pt-20 mx-40">
                <NavbarRoot />
                {children}
            </section>
        ) : (
            route.push('/consulta')
        )


    )
}

export default FreeLayout