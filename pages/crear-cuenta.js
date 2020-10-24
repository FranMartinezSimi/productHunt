import React from 'react'
import Layout from '../components/layouts/Layout'
import { css } from '@emotion/core'

import { Formulario } from '../components/ui/Formulario'
import { Campo } from '../components/ui/Formulario'
import { InputSubmit } from '../components/ui/Formulario'

import UseValidation from '../hook/useValidation'
import CreateAccountValidations from '../validation/validarCrearCuenta';


const Initial_State = {
	nombre:'',
	email: '',
	password: ''
}

const CrearCuenta =() => {

	const { 
		valores,
		errores,
		submitForm,
		handleSubmit,
		handleChange
	 } = UseValidation(Initial_State, CreateAccountValidations, createAccount)

	 const { nombre, email, password } = valores;

	function createAccount(){
		console.log("Creando cuenta")
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
								<Formulario>
									<Campo>
										<label htmlFor="nombre">Nombre</label>
										<input
											type="text"
											id="nombre"
											placeholder="Tu Nombre"
											name="nombre"
											value={nombre}
											onChange={handleChange}
										/>
									</Campo>
									<Campo>
										<label htmlFor="email">Email</label>
										<input
											type="email"
											id="email"
											placeholder="Tu Email"
											name="email"
											value={email}
											onChange={handleChange}
										/>
									</Campo>
									<Campo>
										<label htmlFor="password">Password</label>
										<input
											type="password"
											id="password"
											placeholder="Tu Password"
											name="password"
											value={password}
											onChange={handleChange}
										/>
									</Campo>

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