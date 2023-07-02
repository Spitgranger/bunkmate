"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginForm = void 0;
const Yup = __importStar(require("yup"));
const formValidationSchema = Yup.object({
    email: Yup.string().required("Email required").email("Invalid Email"),
    password: Yup.string().required("Password required").min(3, "Password too short").max(28, "Password too long"),
});
/**
 * Function to validate the contents of the request body for login route
 * @param req The express request object
 * @param res The express response object
 * @param next The next function
 */
const validateLoginForm = (req, res, next) => {
    formValidationSchema.validate(req.body)
        .catch((err) => {
        res.status(422).json(`Could not process login as form data could not be validated due to: ${err.errors}`);
    })
        .then(valid => {
        if (valid) {
            console.log("Validation passed");
            next();
        }
    });
};
exports.validateLoginForm = validateLoginForm;
