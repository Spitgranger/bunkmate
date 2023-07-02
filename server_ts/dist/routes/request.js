"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_1 = require("../controllers/request");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get('/', request_1.getRequests);
router.post('/', auth_1.default, request_1.createRequest);
router.delete('/', auth_1.default, request_1.deleteRequest);
router.patch('/:id', request_1.updateRequest);
exports.default = router;
