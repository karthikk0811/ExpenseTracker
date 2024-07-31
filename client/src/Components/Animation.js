import React from 'react'
import useWindowSize from '../Hooks/useWindowSize'
import { keyframes, styled } from 'styled-components';


export default function Animation() {
    const {width,height} = useWindowSize();
    const move=keyframes`
        0%{
            transform: translate(0, 0);
        }
        50%{
            transform: translate(${width}px, ${height/2}px);
        }
        100%{
            transform: translate(0, 0);
        }
    `;
    const StyleDiv=styled.div`
        width: 100vh;
        height: 100vh;
        position: absolute;
        border-radius: 50%;
        margin-left: -37vh;
        margin-top: -37vh;
        background: linear-gradient(180deg, #F56692 0%, #F2994A 100%);
        filter: blur(300px);
        animation: ${move} 15s alternate linear infinite;
    `;

    return (
        <>
            <StyleDiv/>
        </>
    )
}
