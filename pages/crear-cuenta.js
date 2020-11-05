import React,{ useState } from 'react'
import Layout from '../components/layouts/Layout'
import { css } from '@emotion/core'
import Router from 'next/router'


import { Formulario } from '../components/ui/Formulario'
import { Campo } from '../components/ui/Formulario'
import { InputSubmit } from '../components/ui/Formulario'
import { Error } from '../components/ui/Formulario'

import firebase from '../firebase';

import UseValidation from '../hook/useValidation'
import CreateAccountValidations from '../validation/validarCrearCuenta';


const Initial_State = {
	nombre:'',
	email: '',
	password: ''
}

const CrearCuenta =() => {

	const [err, guardarError] =  useState(false)

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
									
								>Crear Cuenta</h1>
								<Formulario onSubmit= { handleSubmit }>
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
										<label htmlFor="email">Email</label>
										<input
											type="email"
											id="email"
											placeholder="Tu Email"
											name="email"
											value={email}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</Campo>

									{ errores.email && <Error>{errores.email}</Error>}

									<Campo>
										<label htmlFor="password">Password</label>
										<input
											type="password"
											id="password"
											placeholder="Tu Password"
											name="password"
											value={password}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</Campo>
									
									{ errores.password && <Error>{errores.password}</Error>}

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
export default CrearCuenta