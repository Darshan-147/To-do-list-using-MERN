const jwt=require('jsonwebtoken');
const User=require('../models/User');

const protect = async(req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // Getting token from header
            token=req.headers.authorization.split(' ')[1];

            //Verifying token
            const decoded=jwt.verify(token, process.env.JWT_SECRET);

            // Getting user from the token
            req.user=await User.findById(decoded.id).select('-password');

            next();
        } catch(err){
            console.error(err);
            res.status(401).json({message:'Not authorized, token failed'});
        }
    }

    if(!token) {
        res.status(401).json({message:'Not authorized, token is not present'});
    }
};

module.exports=protect;