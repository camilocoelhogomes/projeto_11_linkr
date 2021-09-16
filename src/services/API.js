import axios from "axios";

const API_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr";
const SIGNUP = "/sign-up"

function signUpErrorAlert(error) {
    if (error.status === 400) {
        alert("A url da imagem não é suportada, por favor escolha outra");
    } else if (error.status === 403) {
        alert("O e-mail inserido já está em uso, por favor escolha outro");
    } else {
        alert("Não foi possível realizar seu cadastro")
        alert(error.data);
    };
}

function signUp({ requestBody, history, setIsLoading }) {
    setIsLoading(true);
    const request = axios.post(API_URL + SIGNUP, requestBody);
    request.catch(err => {signUpErrorAlert(err.response)
        setIsLoading(false);
    });
    request.then(res => history.push("/"));
}
export { signUp };