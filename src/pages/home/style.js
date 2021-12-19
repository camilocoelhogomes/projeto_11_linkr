import styled from "styled-components";

const BodyContainer = styled.div`
@media(min-width: 900px){
    display:grid;
    grid-template-columns: 181fr 107fr;
}
`
const Banner = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 175px;
    background: #151515;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color:white;
        @media(min-width: 900px){
            height: 100vh;
            justify-content: flex-start;
            padding-left:15%;
}
`
const AppName = styled.h1`
    font-family: 'Passion One', cursive;
    font-size: 76px;
    letter-spacing:8px;
    text-align:center;
        @media(min-width: 900px){
            font-size: 106px;
            text-align:left;
        }
`
const AppCopy = styled.h2`
    font-family: 'Oswald', sans-serif;
    font-size: 23px;
    line-height: 34px;
    text-align: center;
    width:237px;
        @media(min-width: 900px){
            font-size:43px;
            width:400px;
            line-height:63.73px;
            text-align:justify;
        }
`
const Container = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
`
const StyledInput = styled.input`
    width: 330px;
    height: 55px;
    border:none;
    background: ${props => props.error ? "#ffdddd" : "#ffffff"};
    border-radius: 6px;
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    font-size: 22px;
    line-height: 33px;
    color: #9F9F9F;
    padding-left:17px;
`
const BlueButton = styled.button`
    width: 330px;
    height: 55px;
    background: ${props => props.isLoading ? "#569bf5" : "#1877F2"};
    border: none;
    border-radius: 6px;
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    font-size: 22px;
    line-height: 33px;
    color: #FFFFFF;
    :hover {
        opacity: 0.8;
    }
    :active {
        transform: translateY(-3px);
    }
`
const StyledForm = styled.form`
    display:grid;
    gap:11px;
    justify-content: center;
    margin-top:40px;
`
const Anchor = styled.h4`
    a{
        font-family: 'Lato', sans-serif;
        font-size: 20px;
        color: #FFFFFF;
    }
    margin-top:14px;
    text-align: center;
    .switch-sign {
        :hover {
            opacity: 0.8;
        }
    }
`
const DirectLoginBox = styled.div`
    align-self: center;
    width: 330px;
    background-color: #545454;
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px 20px;
    margin-top: 30px;
`
const DirectLoginButton = styled.button`
    width: 100%;
    height: 50px;
    background-color: #1877F2;
    border-radius: 10px;
    border: none;
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    align-self: center;
    margin-top: 15px;
    :hover {
        opacity: 0.8;
    }
    :active {
        transform: translateY(-3px);
    }
`
const DirectLoginAsk = styled.span`
    h4 {
        margin-bottom: 10px;
        font-weight: 400;
    }
    p {
        font-size: 20px;
        color: #ffffff;
        font-weight: 400;
        line-height: 25px;
        word-break: break-all;
    }
`
export { BodyContainer, Banner, AppName, AppCopy, Container, StyledInput, BlueButton, StyledForm, Anchor, DirectLoginBox, DirectLoginButton, DirectLoginAsk }