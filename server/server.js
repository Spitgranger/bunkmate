import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use('/', postRoutes);


const PORT = process.env.PORT || 5000;
const CONNECTION_URL = "mongodb://127.0.0.1/bunkmate" || process.env.CONNECTION_URL;

mongoose.set('strictQuery', false)
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then( () => {app.listen(PORT, () => console.log(`Server running on port ${PORT}`))} ).catch((error)=>{console.log(error.message)});
