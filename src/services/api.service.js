import axios from "axios";

const API_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr";

const createHeaders = (token) => {
    return { headers: { Authorization: `Bearer ${token}`}};
}

const getTrendingHashtags = ({ token }) => axios.get(`${API_URL}/hashtags/trending`, createHeaders(token));
const sendLike = (postId, { token }) => axios.post(`${API_URL}/posts/${postId}/like`, {}, createHeaders(token));
const sendDislike = (postId, { token }) => axios.post(`${API_URL}/posts/${postId}/dislike`, {}, createHeaders(token));

export {
    getTrendingHashtags,
    sendLike,
    sendDislike,
}