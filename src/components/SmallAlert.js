import React from "react";
import styled from 'styled-components';

export default function SmallAlert ({ errorMessage, top, left }) {
    return (
        <ErrorMessage top={top} left={left}>
            <span>{errorMessage}</span>
        </ErrorMessage>
    )
}

const ErrorMessage = styled.span`
    position: absolute;
    max-width: 200px;
    background-color: #000000;
    border-radius: 5px;
    border: 1px solid #ffffff;
    left: ${props => props.left};
    top: ${props => props.top};
    padding: 7px 7px;
    z-index: 5;
    display: flex;
    justify-content: center;
    span {
        color: #f97a7a;
        font-size: 14px;
        text-align: center;
    }
`