import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// import postRoutes from './routes/posts';
import userRoutes from './routes/users';
import profileRoutes from './routes/profile';
import requestRoutes from './routes/request';
// import chatRoutes from "./routes/chat";
// import mediaPostRoutes from "./routes/mediaPost";
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/request', requestRoutes);
// app.use('/api/chats', chatRoutes);
// app.use('/api/media', mediaPostRoutes);


const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL || "mongodb://127.0.0.1/bunkmate";

mongoose.set('strictQuery', false)
mongoose.connect(CONNECTION_URL, {})
    .then(() => { app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) }).catch((error) => { console.log(error.message) });
