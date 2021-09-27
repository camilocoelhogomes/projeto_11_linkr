import styled from "styled-components";
import {Link} from "react-router-dom";

const TrendingContainer = styled.div`
    width: 301px;
    background-color: #171717;
    border-radius: 16px;
    height: fit-content;
    position: sticky;
    top: 160px; 

    @media(max-width:900px){
        display: none;
    }
`
const TitleBox = styled.div`
    height: 61px;
    border-bottom: 1px solid #484848;
    display: flex;
    align-items: center;
    padding: 0 16px;
`
const Hashtags = styled.ul`
    display: flex;
    flex-direction: column;
    padding: 22px 16px;
    gap: 13px;
    font-weight: 700;
`
const HashtagLink = styled(Link)`
    text-decoration: none;
`
const StyledTrendingInput = styled.input`
    height: 35px;
    width: calc(100% - 32px);
    margin-bottom: 15px;
    margin-left: 16px;
    border-radius: 8px;
    background: #252525;
    outline: none;
    color: #ffffff;
    font-size: 16px;
    padding-left: 36px;
    padding-right: 16px;
    border: none;

    ::placeholder {
        color: #575757;
        font-size: 16px;
        font-style: italic;
        border: none;
    }
`
const StyledHashtagPlaceholder = styled.span`
    font-size: 19px;
    font-weight: 700;
    bottom: 23px;
    left: 29px;
    z-index: 3;
    position: absolute;
`
const Details = styled.details`
    display: none;

    @media(max-width:900px){
        display: initial;
        position: fixed;
        top: 65px;
        left: 0;
        background-color: #171717;
        border-radius: 10px;
        width: 230px;

        @keyframes fadeInDown {
            0% {
                opacity: 0;
                transform: translateX(-10em);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }
        &:not([open]) { 
            height: 40px; 
        }
        &[open] { 
            animation-name: fadeInDown;
            animation-duration: 0.7s;
        }
        &[open] li{ 
            animation-name: fadeInDown;
            animation-duration: 0.75s;
        }
        summary {
            color: #ffffff;
            font-size: 25px;
            font-weight: bold;
            padding: 6px 15px;
        }
    }
`
export { TrendingContainer, TitleBox, Hashtags, HashtagLink, StyledTrendingInput, StyledHashtagPlaceholder, Details }