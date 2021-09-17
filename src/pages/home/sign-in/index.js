import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { logIn } from "../../../services/API"
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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const requestBody = {
        "email": email,
        "password": password,
    }
    function errorAlert(error) {
        if (error.status === 403) {
            alert("User not found. Invalid email or password");
        } else {
            alert("Unable to sign in")
        };
    }
    function requestSignIn(e) {
        e.preventDefault();
        setIsLoading(true);
        const request = logIn(requestBody);
        request.then(() => history.push("/timeline"));
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