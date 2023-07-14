import * as Yup from 'yup';
import {NextFunction, Request, Response} from 'express';

const formValidationSchema = Yup.object({
    email: Yup.string().required("Email required").email("Invalid Email"),
    password: Yup.string().required("Password required").min(3, "Password too short").max(28, "Password too long"),
})

/**
 * Function to validate the contents of the request body for login route
 * @param req The express request object
 * @param res The express response object
 * @param next The next function
 */
export const validateLoginForm = (req: Request, res: Response, next: NextFunction) => {
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
}