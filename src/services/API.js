import axios from "axios";

const API_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr";

const signIn = ( body ) => axios.post(API_URL + "/sign-in", body);

const signUp = ( body ) => axios.post(API_URL + "/sign-up", body);

export { signUp, signIn };