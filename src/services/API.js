import axios from "axios";

const API_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr";
const SIGNUP = "/sign-up";
const SIGNIN = "/sign-in";

const createHeaders = (token) => {
    return { headers: { Authorization: `Bearer ${token}`}};
}

const logIn = ( body ) => axios.post(API_URL + SIGNIN, body);

const signUp = ( body ) => axios.post(API_URL + SIGNUP, body);

const getTrendingHashtags = ({ token }) => axios.get(`${API_URL}/hashtags/trending`, createHeaders(token));

export { 
    signUp, 
    logIn, 
    getTrendingHashtags,
};