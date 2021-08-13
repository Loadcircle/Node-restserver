const { Role } = require('../models/role');
const User = require('..//models/users');

const isValidRole = async (role = '') => {
    const roleExist = await Role.findOne({role});
    if(!roleExist){
        throw new Error(`Role "${role}" is not a valid option`)
    }
}

const isEmailExist = async (email)=>{
    const emailExist = await User.findOne({email});
    if(emailExist){
        throw new Error(`The email "${email}" is already in use`);
    }
};
    
const isUserExist = async (id)=>{    
    const userExist = await User.findById(id);
    if(!userExist){
        throw new Error(`User with id:  "${id}" does not exist`)
    }
}

module.exports = {
    isValidRole,
    isEmailExist,
    isUserExist
}