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
const http_1 = __importDefault(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const redis_1 = __importDefault(require("./redis"));
const auth_1 = require("./middleware/auth");
const socketController_1 = require("./controllers/socketController");
let redisStore = new connect_redis_1.default({
    client: redis_1.default,
});
const app = (0, express_1.default)();
const server = new http_1.default.Server(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
    }
});
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
//app.use(sessionMiddleware);
//io.use(wrap(sessionMiddleware));
io.use(auth_1.authorizeSocketUser);
io.on("connect", (Socket) => {
    const socket = Socket;
    (0, socketController_1.initializeUser)(socket);
    // console.log(socket.id);
    // console.log(socket.request.session.user);
    // console.log(socket.request.session.user.email);
    //On starting a new conversation
    socket.on("start_conversation", (username, callback) => { (0, socketController_1.startConversation)(socket, username, callback); });
    socket.on("disconnecting", () => (0, socketController_1.onDisconnect)(socket));
    socket.on("sendMessage", (message) => { (0, socketController_1.receiveMessage)(socket, message); });
});
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
