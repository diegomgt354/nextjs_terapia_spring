'use client'

import ServicioService from '@/services/ServicioService';
import React, { useEffect, useState } from 'react'

const ServiciosDisponiblesPage = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        ServicioService.getServicios()
            .then(response => setServices(response.data.filter(service => service.estado == 1)))
            .catch(error => console.log(error));

    }, [])

    return (
        <>
            {
                services.map(service => (
                    <a key={service.id} class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 m-5">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{service.nombre}</h5>
                        <p class="font-normal text-gray-700">{service.descripcion}</p>
                    </a>
                ))
            }


        </>
    )
}

export default ServiciosDisponiblesPage