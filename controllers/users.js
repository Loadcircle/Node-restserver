const {response, request} = require('express');
const User = require('..//models/users');
const bcryptjs = require('bcryptjs');

const usersGet = (req, res = response)=>{
    const query = req.query;
    res.json({
        msg: 'Get api - controller',
        query
    })
}

const usersPost = async (req, res = response)=>{
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});
    
    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Save password
    await user.save();

    res.json({
        msg: 'Post api - controller',
        user
    })
}

const usersPut = async(req, res = response)=>{
    const {id} = req.params;
    const {password, google, email, ...rest} = req.body;

    //Validate against DB
    if(password){
        //Encrypt password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest)

    res.json({
        msg: 'Put api - controller',
        id
    })
}

const usersDelete = (req, res = response)=>{
    res.json({
        msg: 'Delete api - controller'
    })
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}