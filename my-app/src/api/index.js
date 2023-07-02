import axios from 'axios';

//const url = 'http://localhost:5000/posts';

const API = axios.create({ baseURL: 'http://localhost:3000/api' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
});
//api endpoints
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
//export const deletePost = (id) => API.delete(`/posts/${id}`)
//export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)

export const createProfile = (formData) => API.post('/profile', formData);
export const getProfile = () => API.get('/profile');
//endpoint to delete profile
export const deleteProfile = () => API.delete(`/profile`)

//need to seperate each profile id by . when using getProfiles endpoint 
export const getProfiles = (profiles) => API.get(`/profile/${profiles}`)
export const createRequest = (formData) => API.post('/request', formData);
export const getRequests = () => API.get('/request');
export const deleteRequest = () => API.delete('/request');
export const getListings = () => API.get("/posts");
export const getChats = (chatData) => API.get(`/chats/${chatData.id}/${chatData.token}`);
export const updateRequest = (id, formData) => API.patch(`/request/${id}`, formData);

//endpoints for social media
export const makePost = (formData) => API.post('/media', formData);
export const getPost = () => API.get('/media');
export const makeComment = (data, id) => API.patch(`/media/${id}/commentPost`, data);
export const likePost = (id) => API.patch(`/media/${id}/likepost`);
export const deletePost = (id) => API.delete(`/media/${id}`);
export const deleteComment = (id) => API.delete(`/media/${id}/comment`);



/*
async function handleSignIn(e, data) {
    console.log(data);
    e.preventDefault();
    const response = await fetch('/api/users/signin', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    const jsonResponse = await response.json();
    console.log(jsonResponse)
    switch (jsonResponse.message) {
        case "User doesn't exist":
            return "User doesn't exist";
        case "Invalid Credentials":
            return "Invalid Credentials";
        default:
            localStorage.setItem('profile', JSON.stringify(jsonResponse));
            return "correct";
    }
}
*/