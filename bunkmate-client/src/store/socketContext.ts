import {io} from 'socket.io-client';
//Get and check if profile exists (user logged in)
const localStorageProfile = localStorage.getItem("profile");
const parsedProfileString = localStorageProfile || "";
let token;
if (parsedProfileString === ""){
    token = "";
} else {
    token = JSON.parse(parsedProfileString).token;
}
//Define the websocket object that will be used across the application
const socket = io("http://localhost:5000", {
    autoConnect: false,
    withCredentials: true,
    auth: {
        token: token,
    },
});

export default socket;