import CustomErrorHandler from '../services/CustomErrorHandler';
import JWtService from '../services/JwtService';
const  auth = async(req, res, next) => {
    let authHeader = req.headers.authorization;
    console.log(authHeader);

    if(!authHeader) {
        return next(CustomErrorHandler.unAuthorized());
    }

     const  token = authHeader.split(' ')[1];
    
    try {
        const {_id, role} = await JWtService.verify(token);
        const user = {
            _id,
            role
        }
        req.user = user;
        next();

    } catch(err) {
        return next(CustomErrorHandler.unAuthorized());
    }
}

export default auth;