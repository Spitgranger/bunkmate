"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_1 = require("../controllers/profile");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get('/', auth_1.default, profile_1.getProfile);
router.post('/', auth_1.default, profile_1.createProfile);
router.get('/:profiles', profile_1.getProfiles);
router.delete('/', auth_1.default, profile_1.deleteProfile);
exports.default = router;
