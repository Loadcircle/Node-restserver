const {response, request} = require('express');
const User = require('..//models/users');
const bcryptjs = require('bcryptjs');

const usersGet = async (req, res = response)=>{
    const query = {status: true}
    const {limit = 5, from = 0} = req.query;

    // const users = await User.find(query)
    //     .skip(Number(from))
    //     .limit(Number(limit));
    // const total = await User.countDocuments(query);

    //Use a collection of promises to execute both promises at same time
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limit)), 
    ]);

    res.json({
        msg: 'Get api - controller',
        from,
        limit,
        total,
        users
    });
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
    const {_id, password, google, email, role, ...rest} = req.body;

    if(password){
        //Encrypt password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest, {new: true});

    res.json({
        msg: 'Put api - controller',
        id,
        user
    })
}

const usersDelete = async (req, res = response)=>{
    const {id} = req.params;

    //Delete User
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {status: false}, {new:true});

    res.json({
        msg: 'Delete api - controller',
        user
    });
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}