const { response } = require("express");
const User = require('..//models/users');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response)=>{
    const {email, password} = req.body;

    try {
        //Check if email exist
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: 'User does not exist',
            });
        }
        
        //Check for user status
        if(!user.status){
            return res.status(400).json({
                msg: 'This user is not active',
            });
        }

        //Check for password
        const validatedPassword = bcryptjs.compareSync(password, user.password);
        if(!validatedPassword){
            return res.status(400).json({
                msg: 'Password incorrect',
            });
        }

        //Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            msg: 'login Route',
            user,
            token
        });
        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            msg: 'Something went wrong',
        })
    }

};

const googleSignIn = async (req, res) =>{

    const { id_token } = req.body;
    
    try {
        const {name, email, picture:img} = await googleVerify(id_token);
      
        let user = await User.findOne({email});
        if(!user){
            //Register user
            const data = {
                email, 
                name, 
                img,
                google : true
            }

            user = new User(data);

            //Save password
            await user.save();
        }

        if(!user.status){            
            res.status(401).json({
                msg: 'Disabled Account',
            });
        }
        
        //Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            msg: 'Google login',
            user, 
            token
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'Token invalid',
        });
    }
}


module.exports = {
    login,
    googleSignIn
}