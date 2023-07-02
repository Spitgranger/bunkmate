import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import userRoutes from './routes/users';
import profileRoutes from './routes/profile';
import requestRoutes from './routes/request';
import Redis from 'ioredis';
import RedisStore from 'connect-redis';
import http from 'http';
import helmet from "helmet";
import cors from 'cors';
import session from 'express-session';
import redisClient from "./redis";

const app = express();
const server = new http.Server(app);

let redisStore = new (RedisStore as any)({
    client: redisClient,
});

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        credentials: true,
    }
});
io.on("connect", () => {});

dotenv.config();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(helmet());
app.use(express.json());
app.use(session({
    secret: process.env.COOKIE_SECRET as string,
    name: "sid",
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.ENVIRONMENT === "production" ? true : "auto",
        httpOnly: true,
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    }
}))
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/request', requestRoutes);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL || "mongodb://127.0.0.1/bunkmate";

mongoose.set('strictQuery', false)
mongoose.connect(CONNECTION_URL, {})
    .then(() => { server.listen(PORT, () => console.log(`Server running on port ${PORT}`)) }).catch((error) => { console.log(error.message) });
