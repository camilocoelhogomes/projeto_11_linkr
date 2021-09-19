import React from "react";
import styled from 'styled-components';

const Alert = ({ message }) => {
    return <StyledAlert>
        <div className='alert-box'>
            <h2>{message}</h2>
        </div>
    </StyledAlert>
}

export default Alert;

const StyledAlert = styled.div`

    height: 100vh;
    width: 100vw;
    background-color: rgba(255,255,255,0.9);
    position: fixed;
    top: 0;
    left: 0%;
    display: flex;
    align-items: center;
    justify-content: center;
    .alert-box{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 597px;
        height: 262px;
        background: #333333;
        border-radius: 50px;
        align-self: center;
        padding: 18px;
    }
`;