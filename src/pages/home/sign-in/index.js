import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Alert from "../../../components/Alert";
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
    StyledDirectLogin,
    StyledCancel,
    StyledConfirm,
    StyledButtonOptions
} from "../style"
export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [lastLogin, setLastLogin] = useState("");
    const history = useHistory();

    const askForDirectLogin = () => {
        if (localStorage.getItem("user") !== null) {
            setLastLogin(JSON.parse(localStorage.getItem("user")));
        }
    }
    window.onload = askForDirectLogin;

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
        <>
        {localStorage.getItem("user") !== null && lastLogin !== "" ? (
            <StyledConfirm>
                <div className='alert-box'>
                    <p>{`Você deseja logar diretamente com a seguinte conta? \n
                    Nome: ${lastLogin.user.username} \n
                    Email: ${lastLogin.user.email}`}</p>
                    <StyledButtonOptions>
                        <StyledDirectLogin onClick={() => history.push("/timeline")}>Logar</StyledDirectLogin>
                        <StyledCancel onClick={() => false}>Cancelar</StyledCancel>   
                    </StyledButtonOptions>
                </div>
            </StyledConfirm>
        ) : (
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
        )}
        </>
    );
}