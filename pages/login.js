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
import validarIniciarSession from '../validation/validarIniciarSession';


const Initial_State = {
	email: '',
	password: ''
}

const Login =() => {

	const [err, guardarError] =  useState(false)

	const { 
		valores,
		errores,
		handleSubmit,
		handleChange,
		handleBlur
	 } = UseValidation(Initial_State, validarIniciarSession, iniciarSeesion)

	 const { email, password } = valores;

	 async function iniciarSeesion(){
		 try {
			 const usuario = await firebase.login(email, password);
			 console.log(usuario)
			 Router.push('/')
		 } catch (error) {
			console.error(`Hubo un error al crear un usuario ${error.message}`)
			guardarError(error.message)
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
									
								>Iniciar Session</h1>
								<Formulario onSubmit= { handleSubmit }>

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
										value="Iniciar Session"
									/>
								</Formulario>
            </Layout>
        </div>
    )
}
export default Login