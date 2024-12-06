import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const register = async (request, response) => {
    try {
        const {name , email , password , role} = request.body; 
        const hashedPassword = await bcrypt.hash(password , 10);

        const newUser  =  new User({name,email, password: hashedPassword, role})
        await newUser.save();
        response.status(201).json({message : `User ${name} created successfully`})
    } catch (error) {
        response.status(500).json({message : error.message})
    }  
}
const login = async (request, response) => {
    try{
        const {email , password} = request.body;
        const user = await User.findOne({email})

        if(!user){
            return response.status(404).json({message : `User with email ${email} not found`})
        }
        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch){
            return response.status(400).json({message : `Invalid credentials`});
        }
        // console.log('User object:', user);
        const token = jwt.sign({id : user._id , name: user.name, role :user.role}, process.env.JWT_SECRET , {expiresIn: "1d"});
        response.status(200).json({message : `User logged in successfully` , token});
    }catch(error){
        response.status(500).json({message : error.message})
    }
}

export { register, login }