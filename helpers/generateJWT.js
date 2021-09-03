const jwt = require('jsonwebtoken');
const {User} = require('../models')

const generateJWT = (uid = '')=>{
    return new Promise((resolve, reject) =>{
        
        const payload = { uid };

        jwt.sign(
            payload, 
            process.env.SECRETORPRIVATEKEY, 
            {
                expiresIn: '4h',
            },
            (err, token)=>{
                if(err){
                    console.log(err);
                    reject('Could not generate the JWT')
                }else{
                    resolve(token);
                }
            });

    });
}

const checkJWT = async (token)=>{
    try {
        if(!token){
            return null;
        }

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);
        
        if(!user || !user.status){
            return null
        }
        return user;

    } catch (error) {
        console.log(error)
        return null;
    }
}

module.exports = {
    generateJWT,
    checkJWT
}