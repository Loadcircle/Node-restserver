const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const User = require('..//models/users');

const validateJWT = async (req = request, res = response, next)=>{
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({
            msg: 'Authorization token required',
        });
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //get auth user
        const user = await User.findById(uid);

        //Check if user
        if(!user){
            return res.status(401).json({
                msg: 'Authorization token invalid - User does not exist',
            });
        }

        //Check user status
        if(!user.status){
            return res.status(401).json({
                msg: 'Authorization token invalid - unactive user',
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Authorization token invalid'
        });        
    }

}

module.exports = {
    validateJWT,
}