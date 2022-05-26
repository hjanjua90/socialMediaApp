const jwt = require('jsonwebtoken');
require('dotenv').config();
const { expressjwt: expressJwt } = require("express-jwt");
const User = require("../models/user");

exports.signup = async (req,res)=>{
    const userExists = await User.findOne({email: req.body.email})
    if (userExists)
        return res.status(403).json({
            error: "Email is taken!"
        })
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({message: "Signup success! Please login"});
}

exports.signin = (req,res)=>{
    //find the user by the user's email
    const {email, password} = req.body
    User.findOne({email}, (err, user)=>{
        //if err \\ no user
        if (err || !user){
            return res.status(401).json({
                error: "User with that email  does not exist. Please signup "
            })
        }
        //if user is found make sure the emailand password match
        //create an authenticate method in user model and use it here
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match "
            })
        }
        //generate a token with user id and SECRET
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        //persist the token as 't' in cookie with expiry date
        res.cookie("t", token, {expire: new Date() + 9999});
        //return response with user and token to frontend client
        const {_id, name, email} = user;
        return res.json({token, user: {_id, email, name} });

    })
};
exports.signout = (req,res)=>{
    res.clearCookie("t");
    return res.json({message: "Signout success!"})
};

exports.requireSignin = expressJwt({
    //if the token is valid, express jwt appends the verified user's id
    //in an auth key to the request object
    secret: process.env.JWT_SECRET,
    algorithms:['HS256'],
    userProperty:"auth"
    
})