"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const validateForm_1 = require("../middleware/validateForm");
const rateLimiter_1 = require("../middleware/rateLimiter");
const router = express_1.default.Router();
router.post('/signin', rateLimiter_1.rateLimiter, validateForm_1.validateLoginForm, users_1.signin);
router.post('/signup', rateLimiter_1.rateLimiter, validateForm_1.validateLoginForm, users_1.signup);
exports.default = router;
