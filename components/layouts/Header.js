import React,{ useContext } from 'react'
import Busacador from '../ui/Buscador'
import Navegacion from './Navegation'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Boton from '../ui/Boton';
import { FirebaseContext } from '../../firebase'


const ContenedorHeader = styled.div`
    max-width:1200px;
    width: 95%;
    margin: 0 auto;
    @media(min-width:768px){
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color: var(--naranja);
    font-size:4rem;
    line-height:0;
    font-weight:700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
    box-shadow: 2px 2px;
`;

const Header =() => {

    const { usuario, firebase } = useContext(FirebaseContext)

    return(
        <header 
            css={css`
                border-bottom: 2px solid var(--gris2);
                padding: 1rem 0;
            `}
        >
            <ContenedorHeader>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <Logo>P</Logo>
                    <Busacador /> 
                    <Navegacion />
                </div>

                <div      
                    css={css`
                        display: flex;
                        align-items: center;
                    `}      
                >   
                  { usuario ? (
                      <>
                        <p
                        css={css` margin-right: 2rem;`}
									>Hola: { usuario.displayName }</p>
										<Boton bgColor="true"
											onClick={ () => firebase.cerrarSession }
										>Cerrar Session</Boton>
                      </>
                  ):(
                      <>
                    <Link href="/login">
                        <Boton
                            bgColor="true"
                        >Login</Boton>
                    </Link>
                    <Link href="/crear-cuenta">
                        <Boton>Crear Cuenta</Boton>
                    </Link>
                      </>
                  ) }
                </div>
            </ContenedorHeader>
        </header>
    )
}

export default Header