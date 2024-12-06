 const authorizeRoles = (...roles) => {
    return (request , response , next) =>{
        if(!roles.includes(request.user.role)){
            return response.status(403).json({message : "Access Denied"});
        }
        next();
    }
}

export default authorizeRoles;