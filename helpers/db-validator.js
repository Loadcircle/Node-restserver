const { Role } = require('../models/role');
const { Category, User, Product } = require('../models');

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

const isCategoryExist = async (id)=>{    
    const categoryExist = await Category.findById(id);
    if(!categoryExist){
        throw new Error(`Cateogry with id:  "${id}" does not exist`)
    }
}

const isProductExist = async (id)=>{    
    const productExist = await Product.findById(id);
    if(!productExist){
        throw new Error(`Product with id:  "${id}" does not exist`)
    }
}

const isCategoryExistByName = async (name)=>{    
    const categoryExist = await Category.findOne({name: name});
    if(!categoryExist){
        throw new Error(`Cateogry ${name} does not exist`)
    }
}

const collectionsAllowed = (collection = '', allowedsCollection = [])=>{
    if(!allowedsCollection.includes(collection)){
        throw new Error(`Collection ${collection} is not allowed - allowed collections: ${allowedsCollection}`)
    }
    //return is required because we're sending extra params to functions, no direct return
    return true;
}

module.exports = {
    isValidRole,
    isEmailExist,
    isUserExist,
    isCategoryExist,
    isProductExist,
    isCategoryExistByName,
    collectionsAllowed
}