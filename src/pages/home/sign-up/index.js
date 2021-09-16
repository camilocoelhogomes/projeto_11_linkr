import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { signUp } from "../../../services/API"

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const requestBody = {
        "email": email,
        "password": password,
        "username": username,
        "pictureUrl": pictureUrl,
    }
    function requestSignUp(e) {
        e.preventDefault();
        setIsLoading(true);
        signUp({ requestBody, history, setIsLoading });
    }
    return (
        <>
            <Banner>
                <strong>
                    <AppName>linkr</AppName>
                    <AppCopy>save, share and discover the best links on the web</AppCopy>
                </strong>
            </Banner>
            <StyledForm onSubmit={(e) => { setIsLoading(true); requestSignUp(e); }}>
                <StyledInput placeholder="e-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <StyledInput placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <StyledInput placeholder="username" type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                <StyledInput placeholder="picture url" type="url" value={pictureUrl} onChange={e => setPictureUrl(e.target.value)} required />
                <BlueButton type="submit" isLoading={isLoading} disabled={isLoading}>{isLoading ? "Loading..." : "Sign Up"}</BlueButton>
            </StyledForm>
            <Anchor>
                <Link to="/">
                    Switch back to log in
                </Link>
            </Anchor>
        </>
    );
}

const Banner = styled.div`
display:flex;
align-items: center;
justify-content: center;
width: 100%;
height: 175px;
background: #151515;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
color:white;
`
const AppName = styled.h1`
font-family: 'Passion One', cursive;
font-size: 76px;
letter-spacing:8px;
text-align:center;
`
const AppCopy = styled.h2`
font-family: 'Oswald', sans-serif;
font-size: 23px;
line-height: 34px;
text-align: center;
width:237px;
`
const StyledInput = styled.input`
width: 330px;
height: 55px;
border:none;
background: #FFFFFF;
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
`
const StyledForm = styled.form`
display:grid;
gap:11px;
justify-content: center;
margin-top:40px;
`
const Anchor = styled.h4`
a{font-family: 'Lato', sans-serif;
font-size: 20px;
color: #FFFFFF;
}
margin-top:14px;
text-align: center;
`