import React, { useState, useEffect, useContext } from 'react'
import Layout from '../components/layouts/Layout'
import DetallesProducto from '../components/layouts/DetallesProducto'
import { FirebaseContext } from '../firebase'

export default function Home() {

	const [ productos, guardarProducto ] = useState([]);

	const { firebase } = useContext(FirebaseContext);
	
	useEffect(() => {
		const obtenerProductos = () => {
			firebase.db.collection('producto').orderBy('creado', 'desc').onSnapshot(manejarSnapshot)
		}
		obtenerProductos()
	}, [])

	function manejarSnapshot(snapshot) {
		const productos = snapshot.docs.map(doc => {
			return {
				id: doc.id,
				...doc.data()
			}
		}) 
		guardarProducto(productos)
	}
  return (
    <div>
      <Layout>
				<div className="listado-productos">
					<div className="contenedor">
						<div className="bg-white">
							{productos.map(producto => (
									< DetallesProducto
										key = {producto.id}
										producto = { producto }
									/>
							))}
						</div>
					</div>
				</div>
      </Layout>
    </div>
  )
}
