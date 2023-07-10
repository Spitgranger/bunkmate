"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const users_1 = __importDefault(require("./routes/users"));
const profile_1 = __importDefault(require("./routes/profile"));
const request_1 = __importDefault(require("./routes/request"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const http_1 = __importDefault(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = __importDefault(require("./redis"));
const app = (0, express_1.default)();
const server = new http_1.default.Server(app);
let redisStore = new connect_redis_1.default({
    client: redis_1.default,
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:5173"],
        credentials: true,
    }
});
io.on("connect", () => {
});
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.COOKIE_SECRET,
    name: "sid",
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.ENVIRONMENT === "production" ? true : "auto",
        httpOnly: true,
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    }
}));
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use('/api/users', users_1.default);
app.use('/api/profile', profile_1.default);
app.use('/api/request', request_1.default);
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL || "mongodb://127.0.0.1/bunkmate";
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(CONNECTION_URL, {})
    .then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
    console.log(error.message);
});
