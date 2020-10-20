import React from 'react'
import Busacador from '../ui/Buscador'
import Navegacion from './Navegation'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Boton from '../ui/Boton';



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
`;

const Header =() => {
    const usuario = true;

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
                    >Hola: Pancho</p>
                    <Boton bgColor="true" >Cerrar Session</Boton>
                      </>
                  ):(
                      <>
                    <Link href="/">
                        <Boton
                            bgColor="true"
                        >Login</Boton></Link>
                    <Link href="/"><Boton>Cerrar Session</Boton></Link>
                      </>
                  ) }
                </div>
            </ContenedorHeader>
        </header>
    )
}

export default Header