import styled from "styled-components";
import React from "react";

export default function LoadingPosts () {
    return (
        <>
                <StyledLoadingPosts backgroundColor={"#ffffff"} color={"#000000"}>
                    ...
                </StyledLoadingPosts>
                <StyledLoadingPosts backgroundColor={"#171717"} color={"#ffffff"}>
                    ...
                </StyledLoadingPosts>
                <StyledLoadingPosts backgroundColor={"#171717"} color={"#ffffff"}>
                    ...
                </StyledLoadingPosts>
                <StyledLoadingPosts backgroundColor={"#171717"} color={"#ffffff"}>
                    ...
                </StyledLoadingPosts>
                <StyledLoadingPosts backgroundColor={"#171717"} color={"#ffffff"}>
                    ...
                </StyledLoadingPosts>
        </>
    )
}
const StyledLoadingPosts = styled.div`
    background-color: ${props => props.backgroundColor};
    border-radius: 16px;
    width: 611px;
    height: 260px;
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
    color: ${props => props.color};
    font-size: 100px;
    padding-top: 50px;
    opacity: 0.7;

    @media(max-width: 900px) {
        width: 100%;
        border-radius: 0px;
    }
`