import jwt from "jsonwebtoken";

const verifyToken  = (request , response , next) => {
    let token;
    let authHeader = request.headers.Authorization || request.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer ")){
        token = authHeader.split(" ")[1];
        if(!token){
            return response.status(401).json({message : "Token not found"});
        }

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            request.user = decoded;
            console.log('Decoded token:', decoded);
            next();
        }catch(error){
            return response.status(401).json({message: "Invalid or expired token"});
        }
    } else {
        return response.status(401).json({message: "Authorization header not found or Bearer token not provided"});
    }
}

export default verifyToken;