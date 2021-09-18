import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signIn } from "../../../services/API"
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
export default function LogIn() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    function errorAlert(error) {
        if (error.status === 403) {
            alert("User not found. Invalid email or password");
        } else {
            alert("Unable to sign in")
        };
    }
    function requestSignIn(e) {
        const requestBody = {
            "email": email,
            "password": password,
        }
        e.preventDefault();
        setIsLoading(true);
        const request = signIn(requestBody);
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
                    requestSignIn(e);
                }}>
                    <StyledInput placeholder="e-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <StyledInput placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <BlueButton type="submit" isLoading={isLoading} disabled={isLoading}>{isLoading ? "Loading..." : "Log In"}</BlueButton>
                </StyledForm>
                <Anchor>
                    <Link to="/sign-up">
                        First time? Create an account!
                    </Link>
                </Anchor>
            </Container>
        </BodyContainer>
    );
}