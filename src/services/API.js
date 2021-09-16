import axios from "axios";

const API_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr";
const SIGNUP = "/sign-up"

function signUpErrorAlert(error) {
    if (error.status === 400) {
        alert("Image url is not supported, please choose another one");
    } else if (error.status === 403) {
        alert("The email you entered is already in use, please choose another one");
    } else {
        alert("Unable to register")
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

const createHeaders = (token) => {
    return {headers: { Authorization: `Bearer ${token}`}};
}

const getUserPosts = ({ token, id }) => axios.get(`${API_URL}/users/${id}/posts`, createHeaders(token));

const getLikedPosts = ({ token }) => axios.get(`${API_URL}/posts/liked`, createHeaders(token));

const getHashtagPosts = ({ token, hashtag }) => axios.get(`${API_URL}/hashtags/${hashtag}/posts`, createHeaders(token));

export { 
    signUp,
    getUserPosts,
    getLikedPosts,
    getHashtagPosts
};