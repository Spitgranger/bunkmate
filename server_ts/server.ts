import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {Server, Socket} from 'socket.io';
import userRoutes from './routes/users';
import profileRoutes from './routes/profile';
import requestRoutes from './routes/request';
import http, {IncomingMessage} from 'http';
import helmet from "helmet";
import cors from 'cors';
import sessionMiddleware, {wrap} from "./middleware/session";
import session, {SessionData} from "express-session";
import Redis from 'ioredis';
import RedisStore from 'connect-redis';
import redisClient from "./redis";
import {authorizeSocketUser} from "./middleware/auth";
import {initializeUser, onDisconnect, receiveMessage, startConversation} from "./controllers/socketController";

let redisStore = new (RedisStore as any)({
    client: redisClient,
});

declare module 'express-session' {
    interface SessionData {
        email: string,
        username: string,
        chatId: string,
    }
}

interface SessionIncomingMessage extends IncomingMessage {
    session: SessionData
}

export interface SessionSocket extends Socket {
    request: SessionIncomingMessage
    user: {email: string, chatId: string, id: string}
}

const app = express();
const server = new http.Server(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
    }
});

dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(helmet());
app.use(express.json({limit: '10mb'}));
//app.use(sessionMiddleware);
//io.use(wrap(sessionMiddleware));
io.use(authorizeSocketUser);
io.on("connect", (Socket) => {
    const socket = <SessionSocket>Socket;
    void initializeUser(socket);
    // console.log(socket.id);
    // console.log(socket.request.session.user);
    // console.log(socket.request.session.user.email);
    //On starting a new conversation
    socket.on("start_conversation", (username, callback) => {void startConversation(socket, username, callback)});
    socket.on("disconnecting", () => onDisconnect(socket));
    socket.on("sendMessage", (message) => {void receiveMessage(socket, message)})
});


app.use(bodyParser.json({limit: "30mb"}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/request', requestRoutes);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL || "mongodb://127.0.0.1/bunkmate";

mongoose.set('strictQuery', false)
mongoose.connect(CONNECTION_URL, {})
    .then(() => {
        server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    }).catch((error) => {
    console.log(error.message)
});
