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
    
module.exports = {
    isValidRole,
    isEmailExist
}