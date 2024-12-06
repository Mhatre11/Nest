import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';
const router = express.Router();

// Only admin users can access this route
router.get('/admin' , verifyToken , authorizeRoles('admin') , (request , response )=>{
    response.json({message : "Welcome Admin"})
});

// Both admin and user can access this route
router.get('/user', verifyToken , authorizeRoles('admin','user') , (request , response)=>{
    response.json({message : "Welcome User"})
});

export default router;