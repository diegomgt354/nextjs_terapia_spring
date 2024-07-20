import Link from "next/link"
import { useState } from "react"

const NavbarRoot = () => {

    const [show, setShow] = useState(false)

    return (


        <nav className="bg-[#e4e1db] fixed w-full z-20 top-0 start-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">Kuskakuy</span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Link href={"/login"} className="text-black bg-[#FFF083] hover:bg-[#c4b863]  font-medium rounded-lg text-sm px-4 py-2 text-center">Ingresar</Link>
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false" onClick={() => setShow(!show)}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`${show ? 'block' : 'hidden'} items-center justify-between  w-full md:flex md:w-auto md:order-1" id="navbar-sticky`}>
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                        <li>
                            <Link href={"/"} className="block py-2 px-3 text-white rounded md:bg-transparent md:text-[#807942] md:p-0" aria-current="page">Inicio</Link>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ">Nosotros</a>
                        </li>
                        <li>
                            <Link href={"/disponibles"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ">Nuestros Servicios</Link>
                        </li>
                        <li>
                            <Link href={"/newConsulta"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Contactanos</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    )
}

export default NavbarRoot