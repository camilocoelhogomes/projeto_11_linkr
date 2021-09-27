import styled from "styled-components";
import React from "react";
import { useLocation } from "react-router-dom";

export default function LoadingPosts () {

    const location = useLocation();
    const fakePosts = ["p1", "p2", "p3", "p4", "p5"];

    return (
        <>
            {location.pathname === "/timeline" ? (
                <StyledLoadingPosts backgroundColor={"#ffffff"} color={"#000000"}>
                    ...
                </StyledLoadingPosts>
            ) : ("")}
            {fakePosts.map(fakePost => 
                <StyledLoadingPosts key={fakePost} backgroundColor={"#171717"} color={"#ffffff"}>
                    ...
                </StyledLoadingPosts>
                )}
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