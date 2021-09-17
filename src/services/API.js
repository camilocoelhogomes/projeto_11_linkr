import axios from "axios";

const API_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr";
const SIGNUP = "/sign-up";
const SIGNIN = "/sign-in";

const logIn = ( body ) => axios.post(API_URL + SIGNIN, body);

const signUp = ( body ) => axios.post(API_URL + SIGNUP, body);

export { signUp, logIn };