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



const Initial_State = {
	Nombre: '',
	Empresa: '',
	Imagen: '',
	Url: '',
	Descripcion: ''
}

export default function NuevoProducto() {

	const [ error, guardarError ] =  useState(false)

	const { 
		valores,
		errores,
		handleSubmit,
		handleChange,
		handleBlur
	 } = UseValidation(Initial_State, CreateAccountValidations, createAccount)

	 const { Nombre, Empresa, Imagen, Url, Descripcion } = valores;

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

									<fieldset>
										<legend>Informacion General </legend>
									
									<Campo>
										<label htmlFor="nombre">Nombre</label>
										<input
											type="text"
											id="nombre"
											placeholder="Tu Nombre"
											name="nombre"
											value={Nombre}
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

									</fieldset>

									<fieldset>
										<legend>Sobre tu producto</legend>
									

									<Campo>
										<label htmlFor="descripcion">Descripcion</label>
										<textarea
											id="descripcion"
											name="descripcion"
											value={Descripcion}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</Campo>

									{ errores.descripcion && <Error>{errores.descripcion}</Error>}

									</fieldset>

									{ error && <Error>{err}</Error>}

									<InputSubmit 
										type="submit"
										value="Crear cuenta"
									/>
								</Formulario>
            </Layout>
        </div>
    )
}
