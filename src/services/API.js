import axios from "axios";

const API_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr";

const createHeaders = (token) => {
    return { headers: { Authorization: `Bearer ${token}`}};
}

const signIn = ( body ) => axios.post(API_URL + "/sign-in", body);

const signUp = ( body ) => axios.post(API_URL + "/sign-up", body);

<<<<<<< HEAD
const getTrendingHashtags = (token) => axios.get(`${API_URL}/hashtags/trending`, createHeaders(token));
=======
const getTrendingHashtags = ({ token }) => axios.get(`${API_URL}/hashtags/trending`, createHeaders(token));
>>>>>>> 8287d9c385c9a5238adee0da36436e51aa93815b

export { 
    signUp, 
    signIn,
    getTrendingHashtags,
};