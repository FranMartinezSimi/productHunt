import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'


const InputText = styled.input`
    border: 1px solid var(--gris2);
    padding: 1rem;
    min-width: 300px;
`;

const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/imagenes/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 0.1rem;
    background-color: white;
    border:none;
    text-indent: -99999px;
    &:hover {
        cursor: pointer;
    }
`

export default function Busacador () {
    return(
        <form
            css={css` position: relative;`}
        >
            <InputText type="text" />
            <InputSubmit type="submit"> Buscar </InputSubmit>
        </form>
    )
}