import React,{ useState } from 'react'
import Layout from '../components/layouts/Layout'
import { css } from '@emotion/core'
import Router from 'next/router'


import { Formulario } from '../components/ui/Formulario'
import { Campo } from '../components/ui/Formulario'
import { InputSubmit } from '../components/ui/Formulario'
import { Error } from '../components/ui/Formulario'

import firebase from '../firebase';

//validaciones
import UseValidation from '../hook/useValidation'
import CreateAccountValidations from '../validation/validarCrearCuenta';


export default function NuevoProducto() {

	const [ error, guardarError ] =  useState(false)

	const { 
		valores,
		errores,
		handleSubmit,
		handleChange,
		handleBlur
	 } = UseValidation(Initial_State, CreateAccountValidations, createAccount)

	 const { nombre, email, password } = valores;

	 async function createAccount(){
		 try {
			 await firebase.registrar(nombre, email, password);
			console.log(`El usuario ${nombre}, ha sido creado satisfactoriamente`)
			Router.push('/')
		 } catch (error) {
			 console.error(`Errror al crear el usuario ${nombre}`, error.message)
		 }
		}
	

    return (
        <div>
            <Layout>
                <h1
									css = { css`
										text-align:center;
										margin-top: 5rem;
									` }
									
								>Nuevo Producto</h1>
								<Formulario onSubmit= { handleSubmit }
									noValidate
								>
									<Campo>
										<label htmlFor="nombre">Nombre</label>
										<input
											type="text"
											id="nombre"
											placeholder="Tu Nombre"
											name="nombre"
											value={nombre}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</Campo>

									{ errores.nombre && <Error>{errores.nombre}</Error>}
									<Campo>
										<label htmlFor="Empresa">Empresa</label>
										<input
											type="text"
											id="Empresa"
											placeholder="Empresa o Compañia"
											name="Empresa"
											value={Empresa}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</Campo>

									{ errores.Empresa && <Error>{errores.Empresa}</Error>}

									<Campo>
										<label htmlFor="imagen">Imagen</label>
										<input
											type="file"
											id="imagen"
											name="imagen"
											value={Imagen}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</Campo>

									{ errores.Imagen && <Error>{errores.Imagen}</Error>}

									<Campo>
										<label htmlFor="url">URL</label>
										<input
											type="url"
											id="url"
											name="url"
											value={Url}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</Campo>

									{ errores.Empresa && <Error>{errores.Empresa}</Error>}

									{ err && <Error>{err}</Error>}

									<InputSubmit 
										type="submit"
										value="Crear cuenta"
									/>
								</Formulario>
            </Layout>
        </div>
    )
}
