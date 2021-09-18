import axios from "axios";

const API_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr";

const createHeaders = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } };
}

const getUserPosts = ({ token, id }) => axios.get(`${API_URL}/users/${id}/posts`, createHeaders(token));
const getLikedPosts = ({ token }) => axios.get(`${API_URL}/posts/liked`, createHeaders(token));
const getHashtagPosts = ({ token, hashtag }) => axios.get(`${API_URL}/hashtags/${hashtag}/posts`, createHeaders(token));
const getServerPosts = ({ token }) => axios.get(`${API_URL}/posts`, createHeaders(token));
const signIn = (body) => axios.post(API_URL + "/sign-in", body);
const signUp = (body) => axios.post(API_URL + "/sign-up", body);
const getTrendingHashtags = (token) => axios.get(`${API_URL}/hashtags/trending`, createHeaders(token));
const sendLike = (postId, token) => axios.post(`${API_URL}/posts/${postId}/like`, {}, createHeaders(token));
const sendDislike = (postId, token) => axios.post(`${API_URL}/posts/${postId}/dislike`, {}, createHeaders(token))
const publishPost = ({ token, body }) => axios.post(`${API_URL}/posts`, body, createHeaders(token));

export {
    signUp,
    signIn,
    getTrendingHashtags,
    getServerPosts,
    getUserPosts,
    getLikedPosts,
    getHashtagPosts,
    sendLike,
    sendDislike,
    publishPost,
};