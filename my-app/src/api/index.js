import axios from 'axios';

//const url = 'http://localhost:5000/posts';

const API = axios.create({ baseURL: 'http://localhost:3000/api' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)

export const createProfile = (formData) => API.post('/profile', formData);
export const getProfile = () => API.get('/profile');
export const createRequest = (formData) => API.post('/request', formData);
export const getRequests = () => API.get('/request');
export const getListings = () => API.get("/posts");
export const getChats = (chatData) => API.get(`/chats/${chatData.id}/${chatData.token}`);




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