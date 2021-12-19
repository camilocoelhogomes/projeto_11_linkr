import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SmallAlert from "../../../components/SmallAlert";
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
    const [error, setError] = useState(false);
    const history = useHistory();
    const requestBody = {
        "email": email,
        "password": password,
        "username": username,
        "pictureUrl": pictureUrl,
    }
    function errorMessage(err) {
        if (err === "email") return "Please enter a valid email address";
        if (err === 403) return "Email already in use";
    }
    function errorCase(error) {
        if (error.status === 403) {
            setError(403);
        } else if (error.status === 400) {
            const invalidParam = error.data.message.slice(15);
            setError(invalidParam);
        } else {
            alert("Unable to register")
        };
        setTimeout(() => setError(false), 2000);
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
            errorCase(err.response)
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
                    <div style={{ position: "relative" }}>
                        <StyledInput placeholder="e-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} error={error === "email" || error === 403} required />
                        {(error === "email" || error === 403) ? <SmallAlert errorMessage={() => errorMessage(error)} top={"0"} left={"300px"} /> : null}
                    </div>
                    <StyledInput placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <StyledInput placeholder="username" type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                    <div style={{ position: "relative" }}>
                        <StyledInput placeholder="picture url" type="url" value={pictureUrl} onChange={e => setPictureUrl(e.target.value)} error={error === "pictureUrl"} required />
                        {error === "pictureUrl" ? <SmallAlert errorMessage={"Please enter a valid picture url address"} top={"0"} left={"300px"} /> : null}
                    </div>
                    <BlueButton type="submit" isLoading={isLoading} disabled={isLoading}>{isLoading ? "Loading..." : "Sign Up"}</BlueButton>
                </StyledForm>
                <Anchor>
                    <Link to="/" className="switch-sign">
                        Switch back to log in
                    </Link>
                </Anchor>
            </Container>
        </BodyContainer>
    );
}