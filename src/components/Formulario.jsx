import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom"
import * as Yup from "yup";
import Alerta from './Alerta';
import Spinner from './Spinner';



const Formulario = ({cliente, cargando}) => {
    /* Hook que permite redireccionar hacia una url especifica */
    const navigate = useNavigate();

    /* Validación del formulario con YUP */
    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, "El nombre es corto")
                    .max(25, "El nombre es largo")
                    .required("El campo es obligatorio"),
        empresa: Yup.string()
                    .min(3, "El nombre es corto")
                    .max(25, "El nombre es largo")
                    .required("El campo es obligatorio"),
        email: Yup.string()
                    .email("El email es incorrecto")
                    .min(3, "El nombre es corto")
                    .max(40, "El nombre es largo")
                    .required("El campo es obligatorio"),
        telefono: Yup.number()
                    .positive("El número no es válido")
                    .integer("El número no es válido")
                    .min(3, "El número es muy corto")
                    .typeError("El número no es válido"),
        notas: "",
    })

    const handleSubmit = async (valores) =>{
        try {
            let respuesta
           if(cliente.id){
                /* Actualizar cliente */
                const url = `http://localhost:4000/clientes/${cliente.id}`
                respuesta = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(valores),
                    headers: {
                        "Content-Type": "application/json"              
                    }
                })
           }else{
                /* Nuevo registro */
                const url = "http://localhost:4000/clientes"
                respuesta = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(valores),
                    headers: {
                        "Content-Type": "application/json"              
                    }
                }) 
           }
           await respuesta.json()
           navigate("/clientes");
        } catch (error) {
            console.log(error);
        }
         
    }  

  return (
    cargando ? <Spinner /> : (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
                {cliente?.nombre ? "Editar cliente" : "Agregar cliente"}
            </h1>

            <Formik 
                initialValues={{
                    /* cliente?.nombre ?? "": esta sintaxis sirve para determinar si hay un underfined o no. Si lo hay, imprime un string vacio */
                    nombre: cliente?.nombre ?? "",
                    empresa: cliente?.empresa ?? "",
                    email: cliente?.email ?? "",
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? ""
                }}

                /* Permite cargar los datos en el formulario cuando se quiere editar un cliente */
                enableReinitialize={true}

                /* Obtención de datos del formulario */
                onSubmit={ async(values,{resetForm}) =>{
                    await handleSubmit(values)

                    resetForm();
                }}

                /* Validación del formulario con YUP */
                validationSchema={nuevoClienteSchema}
            >
                {({errors, touched}) => {
                    return(
                <Form
                    className='mt-10'
                >
                    <div className='mb-4'>
                        <label 
                            htmlFor='nombre'
                            className='text-gray-800'
                        >Nombre:</label>
                        <Field 
                            id="nombre"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-100 border-2"
                            placeholder="Nombre del cliente"
                            name="nombre"
                        />

                        {/* Validación del formulario con YUP */}
                        {errors.nombre && touched.nombre ? (
                        <Alerta>{errors.nombre}</Alerta>
                        ) : null}
                    </div>

                    <div className='mb-4'>
                        <label 
                            htmlFor='empresa'
                            className='text-gray-800'
                        >Empresa:</label>
                        <Field 
                            id="empresa"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-100 border-2"
                            placeholder="Empresa del cliente"
                            name="empresa"
                        />

                        {/* Validación del formulario con YUP */}
                        {errors.empresa && touched.empresa ? (
                        <Alerta>{errors.empresa}</Alerta>
                        ) : null}
                    </div>

                    <div className='mb-4'>
                        <label 
                            htmlFor='email'
                            className='text-gray-800'
                        >Email:</label>
                        <Field 
                            id="email"
                            type="email"
                            className="mt-2 block w-full p-3 bg-gray-100 border-2"
                            placeholder="Email del cliente"
                            name="email"
                        />

                        {/* Validación del formulario con YUP */}
                        {errors.email && touched.email ? (
                        <Alerta>{errors.email}</Alerta>
                        ) : null}
                    </div>

                    <div className='mb-4'>
                        <label 
                            htmlFor='telefono'
                            className='text-gray-800'
                        >Teléfono:</label>
                        <Field 
                            id="telefono"
                            type="tel"
                            className="mt-2 block w-full p-3 bg-gray-100 border-2"
                            placeholder="Teléfono del cliente"
                            name="telefono"
                        />

                        {/* Validación del formulario con YUP */}
                        {errors.telefono && touched.telefono ? (
                        <Alerta>{errors.telefono}</Alerta>
                        ) : null}
                    </div>

                    <div className='mb-4'>
                        <label 
                            htmlFor='notas'
                            className='text-gray-800'
                        >Notas:</label>
                        <Field 
                            as="textarea"
                            id="notas"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-100 border-2 h-40"
                            placeholder="Notas del cliente"
                            name="notas"
                        />
                    </div>

                    <input 
                        type="submit" 
                        value= {cliente?.nombre ? "Editar cliente" : "Agregar cliente"}
                        className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg shadow-md rounded-md hover:bg-blue-900 cursor-pointer transition-all'
                    />
                </Form>

                )}}
            </Formik>
        </div>
    )
  )
}

/* Default props */
Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario