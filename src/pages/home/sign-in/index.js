import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SmallAlert from "../../../components/SmallAlert";
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
    Anchor,
    DirectLoginBox,
    DirectLoginButton,
    DirectLoginAsk
} from "../style"

export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [lastLogin, setLastLogin] = useState("");
    const [error, setError] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("user") !== null) {
            setLastLogin(JSON.parse(localStorage.getItem("user")));
        }
    }, [])

    function errorAlert(error) {
        if (error.status === 403) {
            setError("User not found. Invalid email or password");
        } else {
            alert("Unable to sign in");
        };
        setTimeout(() => setError(false), 2000);
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
        <>
            <BodyContainer>
                <Banner>
                    <strong>
                        <AppName>linkr</AppName>
                        <AppCopy>save, share and discover the best links on the web</AppCopy>
                    </strong>
                </Banner>
                <Container>
                    <StyledForm
                        style={{ position: "relative" }}
                        onSubmit={(e) => {
                            setIsLoading(true);
                            requestSignIn(e);
                        }}>
                        <StyledInput placeholder="e-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} error={!!error} required />
                        <StyledInput placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} error={!!error} required />
                        {!!error ? <SmallAlert errorMessage={error} top={"0"} left={"330px"} /> : null}
                        <BlueButton type="submit" isLoading={isLoading} disabled={isLoading}>{isLoading ? "Loading..." : "Log In"}</BlueButton>
                    </StyledForm>
                    <Anchor>
                        <Link to="/sign-up" className="switch-sign">
                            First time? Create an account!
                        </Link>
                    </Anchor>
                    {lastLogin !== "" ? (
                        <DirectLoginBox>
                            <DirectLoginAsk>
                                <h4>Você deseja logar diretamente com a seguinte conta?</h4>
                                <p>Nome: <strong>{lastLogin.user.username}</strong></p>
                                <p>Email: <strong>{lastLogin.user.email}</strong></p>
                            </DirectLoginAsk>
                            <DirectLoginButton onClick={() => history.push("/timeline")}>Logar</DirectLoginButton>
                        </DirectLoginBox>
                    ) : ("")}
                </Container>
            </BodyContainer>
        </>
    );
}