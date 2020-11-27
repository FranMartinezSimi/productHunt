import React,{ useState, useContext } from 'react'
import Layout from '../components/layouts/Layout'
import { css } from '@emotion/core'
import Router,{ useRouter } from 'next/router'
import FileUploader from 'react-firebase-file-uploader'

import { Formulario } from '../components/ui/Formulario'
import { Campo } from '../components/ui/Formulario'
import { InputSubmit } from '../components/ui/Formulario'
import { Error } from '../components/ui/Formulario'

import { FirebaseContext } from '../firebase';

//validaciones
import UseValidation from '../hook/useValidation'
import createProductValidation from '../validation/validarCrearProducto';



const Initial_State = {
	Nombre:'',
	Empresa: '',
	Imagen: '',
	Url: '',
	Descripcion: ''
}

export default function NuevoProducto() {

	//Firebase Uplad Images

	const [ nombreImage, guardarNombreImagen ] =  useState('')
	const [ subiendo, guardarSubiendo ] = useState(false)
	const [ progreso, guardarProgreso ] = useState(0)
	const [ urlImagen, guardarUrlImagen ] = useState('')

	

	const [ error, guardarError ] =  useState(false)

	const { 
		valores,
		errores,
		handleSubmit,
		handleChange,
		handleBlur
	 } = UseValidation(Initial_State, createProductValidation, createProduct)

	 const { Nombre, Empresa, Imagen, Url, Descripcion } = valores;

	 const router = useRouter()

	 const { usuario, firebase } = useContext(FirebaseContext)
 

	 async function createProduct(){

		if(!usuario) {
			//si no esta logeado
			return router.push('/login')
		}

		//crear el objeto de producto

		const producto = {
			Nombre,
			Empresa,
			Url,
			Descripcion,
			votos: 0,
			comentarios: [],
			creado: Date.now()
		} 

		//insertar en base de datos
		firebase.db.collection('productos').add(producto )
		return router.push('/')
	 }

	 const handleUploadStart = () => {
		guardarProgreso(0);
		guardarSubiendo(true);
	}
  
	const handleProgress = progreso => guardarProgreso({ progreso });
  
	const handleUploadError = error => {
		guardarSubiendo(error);
		console.error(error);
	};
  
	const handleUploadSuccess = Nombre => {
		guardarProgreso(100);
		guardarSubiendo(false);
		guardarNombre(Nombre)
		firebase
			.storage
			.ref("productos")
			.child(Nombre)
			.getDownloadURL()
			.then(url => {
			  console.log(url);
			  guardarUrlImagen(url);
			} );
	};
	

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
									<label htmlFor="Nombre">Nombre</label>
										<input 
                       				 	type="text"
                       				 	id="Nombre"
                       				 	placeholder="Nombre del Producto"
                       				 	name="Nombre"
                        				value={Nombre}
                        				onChange={handleChange}
                        				onBlur={handleBlur}
                    				/>
									</Campo>

									{ errores.Nombre && <Error>{errores.Nombre}</Error>}
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
										<FileUploader
											accept="image/*"
											id="imagen"
											name="imagen"
											randomizeFilename
											storageRef={firebase.storage.ref("productos")}
											onUploadStart={handleUploadStart}
											onUploadError={handleUploadError}
											onUploadSuccess={handleUploadSuccess}
											onProgress={handleProgress}
										/>
									</Campo>

									<Campo>
                   						 <label htmlFor="Url">URL</label>
                   						<input 
                        					type="url"
                        					id="Url"
                        					name="Url"
                        					placeholder="URL de tu producto"
                        					value={Url}
                        					onChange={handleChange}
                        					onBlur={handleBlur}
                    				/>
                					</Campo>

									{ errores.Url && <Error>{errores.Url}</Error>}

									</fieldset>

									<fieldset>
										<legend>Sobre tu producto</legend>
									

									<Campo>
										<label htmlFor="Descripcion">Descripcion</label>
										<textarea
											id="Descripcion"
											name="Descripcion"
											value={Descripcion}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</Campo>

									{ errores.Descripcion && <Error>{errores.Descripcion}</Error>}

									</fieldset>

									{ error && <Error>{err}</Error>}

									<InputSubmit 
										type="submit"
										value="Crear Producto"
									/>
								</Formulario>
            </Layout>
        </div>
    )
}
