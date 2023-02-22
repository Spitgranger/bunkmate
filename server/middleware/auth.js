import jwt from 'jsonwebtoken'

// want to like a post
// click the like button ==> auth middleWare(NEXT) => like controller

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let decodedData;
        decodedData = jwt.verify(token, 'test');
        req.userId = decodedData?.id
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json("must be logged in");
    }
}

export default auth