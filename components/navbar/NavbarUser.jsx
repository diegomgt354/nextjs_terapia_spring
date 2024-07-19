import TokenAux from "@/services/TokenAux";
import Image from "next/image";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";

const NavbarUser = ({ sub, iat, exp, rol, nombres, estado }) => {

    const route = useRouter();

    const [show, setShow] = useState(false)
    const [showAvatar, setShowAvatar] = useState(false)

    const token = TokenAux();

    const logout = () => {
        token.removeToken();
        route.push('/');
    }



    return (


        <nav className="bg-[#e4e1db] fixed w-full z-20 top-0 start-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">Kuskakuy</span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

                    <div className="flex items-center gap-2">
                        <span>{rol}</span>
                        <button onClick={() => setShowAvatar(!showAvatar)} type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <Image className="w-8 h-8 rounded-full" src={'https://minotar.net/armor/bust/mhf_steve/500.png'} height={32} width={32} alt="usuario" />
                        </button>
                    </div>
                    <div className={`z-50 ${showAvatar ? '' : 'hidden'} my-4 text-base list-none absolute top-5 right-5 bg-white divide-y divide-gray-100 rounded-lg shadow`} id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-[10px] text-center text-blue-700">{nombres}</span>
                            <span className="block text-sm  text-gray-500 truncate">{sub}</span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">

                            <li>
                                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Citas</a>
                            </li>
                            <li>
                                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cambiar Contraseña</a>
                            </li>
                            <li>
                                <a onClick={() => logout()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Cerrar sesión</a>
                            </li>
                        </ul>
                    </div>

                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden 
                    hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false" onClick={() => setShow(!show)}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`${show ? 'block' : 'hidden'}  items-center justify-between w-full xl:flex xl:w-auto xl:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                        <li>
                            <Link href={"/consulta"} className="block py-2 px-3 text-white rounded xl:bg-transparent xl:text-[#807942] xl:p-0" aria-current="page">Mis Pendientes</Link>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ">Horario</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    )
}

export default NavbarUser