import React from 'react'
import Link from 'next/link'

export default function Navegacion() {
    return(
        <nav>
            <Link href="/">Home</Link>
            <Link href="/">Populares</Link>
            <Link href="/">Nuevo Producto</Link>
        </nav>
    )
}