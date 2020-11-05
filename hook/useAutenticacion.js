import React, { useState, useEffect  } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import firebase from '../firebase'
import firebaseConfig from '../firebase/config'

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
	})
}

export default useAutenticacion