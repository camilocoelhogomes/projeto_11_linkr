import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signUp } from "../../../services/API"
import {
    BodyContainer,
    Banner,
    AppName,
    AppCopy,
    Container,
    StyledInput,
    BlueButton,
    StyledForm,
    Anchor
} from "../style"
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
    function errorAlert(error) {
        if (error.status === 403) {
            alert("The email you entered is already in use, please choose another one");
        } else if (error.status === 400) {
            const invalidParam = error.data.message.slice(15);
            alert(`${invalidParam} format is not supported, please choose another one`);
        } else {
            alert("Unable to register")
        };

    }
    function requestSignUp(e) {
        e.preventDefault();
        setIsLoading(true);
        const request = signUp(requestBody);
        request.then((res) => {
            const user = JSON.stringify(res.data);
            localStorage.setItem('user', user);
            history.push("/timeline");
        });
        request.catch(err => {
            errorAlert(err.response)
            setIsLoading(false);
        });
    }
    return (
        <BodyContainer>
            <Banner>
                <strong>
                    <AppName>linkr</AppName>
                    <AppCopy>save, share and discover the best links on the web</AppCopy>
                </strong>
            </Banner>
            <Container>
                <StyledForm onSubmit={(e) => {
                    setIsLoading(true);
                    requestSignUp(e);
                }}>
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
            </Container>
        </BodyContainer>
    );
}