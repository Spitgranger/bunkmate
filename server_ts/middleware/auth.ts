import jwt, {JwtPayload} from "jsonwebtoken";
import {Request, NextFunction, Response, RequestHandler} from 'express';
// want to like a post
// click the like button ==> auth middleWare(NEXT) => like controller
interface AuthMiddlewareRequest extends Request {
    userId: string
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthMiddlewareRequest;
        const token = req?.headers?.authorization?.split(' ')[1];
        if(token !== undefined){
            let decodedData;
            decodedData = jwt.verify(token, 'test') as JwtPayload;
            authReq.userId = decodedData?.id;
            req = authReq;
            next();
        }
        else {
            res.status(500).json("Error when parsing access token");
        }
    } catch (error) {
        console.log(error);
        res.status(403).json("must be logged in");
    }
}

export default auth