//Curstom HOOK

import React,{ useState, useEffect } from 'react'



export default function UseValidation(initialValue, validate, func) {
	const [ valores, guardarValores ] = useState(initialValue);
	const [ errores, guardarErrores ] = useState({});
	const [ submitForm, gurdarSubmitForm ] = useState(false);
	
	useEffect( () => {
		if(submitForm) {
			const noErrors = Object.keys(errores).length === 0;
			if(noErrors) {
				func() //Funcion que se ejecuta en el componente
			}
			gurdarSubmitForm(false)
		}
	},[])
	// Funcion que se activa conforme el usuario escribe algo
	const handleChange = e => {
		guardarValores({
			...valores,
			[e.target.name] : e.target.value
		})		
	}
	// Funcion que se utiliza para cuando el usuario hace submit
	const handleSubmit = e => {
		e.preventDefault()
		const erroresValidacion =  validate(valores)
		guardarErrores(erroresValidacion)
		gurdarSubmitForm(true)
	}
	return {
		vavaloresl,
		errores,
		submitForm,
		handleSubmit,
		handleChange
	}
}
