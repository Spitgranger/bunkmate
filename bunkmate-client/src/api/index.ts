import axios from 'axios';

//const url = 'http://localhost:5000/posts';

const API = axios.create({baseURL: 'http://localhost:5000/api'})

API.interceptors.request.use((req) => {
    const RetrieveData: string | null = localStorage.getItem("profile")
    if (RetrieveData) {
        req.headers.Authorization = `Bearer ${JSON.parse(RetrieveData).token}`
    }
    return req;
});
//api endpoints
//export const fetchPost = (id: string) => API.get(`/posts/${id}`);
//export const fetchPosts = (page: object) => API.get(`/posts?page=${page}`);
//export const fetchPostsBySearch = (searchQuery: object) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
//export const createPost = (newPost: object) => API.post('/posts', newPost);
//export const updatePost = (id: string, updatedPost: object) => API.patch(`/posts/${id}`, updatedPost)
//export const deletePost = (id) => API.delete(`/posts/${id}`)
//export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signIn = (formData: object) => API.post('/users/signin', formData)
export const signUp = (formData: object) => API.post('/users/signup', formData)

export const createProfile = (formData: object) => API.post('/profile', formData);
export const getProfile = () => API.get('/profile');
//endpoint to delete profile
export const deleteProfile = () => API.delete(`/profile`)

//need to separate each profile id by . when using getProfiles endpoint
export const getProfiles = (profiles: string) => API.get(`/profile/${profiles}`)
export const createRequest = (formData: object) => API.post('/request', formData);
export const getRequests = () => API.get('/request');
export const deleteRequest = () => API.delete('/request');
export const getListings = () => API.get("/posts");
//export const getChats = (chatData: object) => API.get(`/chats/${chatData.id}/${chatData.token}`);
//export const updateRequest = (id: string, formData: object) => API.patch(`/request/${id}`, formData);

//endpoints for social media
//export const makePost = (formData: object) => API.post('/media', formData);
//export const getPost = () => API.get('/media');
//export const makeComment = (data: object, id: string) => API.patch(`/media/${id}/commentPost`, data);
//export const likePost = (id: string) => API.patch(`/media/${id}/likepost`);
//export const deletePost = (id: string) => API.delete(`/media/${id}`);
//export const deleteComment = (id: string) => API.delete(`/media/${id}/comment`);


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