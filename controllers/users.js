const {response} = require('express');

const usersGet = (req, res = response)=>{
    const query = req.query;
    res.json({
        msg: 'Get api - controller',
        query
    })
}

const usersPost = (req, res = response)=>{
    const {nombre, edad} = req.body;
    
    res.json({
        msg: 'Post api - controller',
        nombre,
        edad
    })
}

const usersPut = (req, res = response)=>{
    const {id} = req.params;

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