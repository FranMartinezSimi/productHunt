import React, { useState, useEffect  } from 'react'
import firebase from '../firebase'

function useAutenticacion() {
	const [usuarioAutenticado, guardarUsuarioAutenticado ] = useState(null)

	useEffect(() => {
		const unSuscribe = firebase.auth.onAuthStateChanged(usuario => {
			if (usuario) {
				guardarUsuarioAutenticado(usuario)
			} else {
				guardarUsuarioAutenticado(null)
			}
		})
		return () => unSuscribe()
	}, [])

	return usuarioAutenticado
}

export default useAutenticacion