import React, { useState, useEffect } from 'react';
import Formulario from '../components/Formulario';

const NuevoCliente = () => {
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>
        Nuevo cliente
      </h1>
      <p className='mt-3'>
        Rellena los siguientes campos para registrar un cliente
      </p>

      <Formulario />
    </>
  )
}

export default NuevoCliente