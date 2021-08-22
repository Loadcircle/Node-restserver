const { response } = require("express");
const {Category, User, Product} = require('../models');
const {ObjectId } = require('mongoose').Types

const collectionsAllowed = [
    'products',
    'categories',
    'users',
];


const searchUsers = async (term = '', res = response)=>{
    const isMongoID = ObjectId.isValid(term);

    if(isMongoID){        
        const user = await User.findById(term);
        return res.json({
            msg: 'Search...',
            results: user ? [user] : []
        });        
    }

    //Regular expresion case insensitive and flexible match
    const regex = new RegExp(term, 'i');

    //search by email or name
    const users = await User.find({
        $or: [
            {name: regex},
            {email: regex},
        ],
        // $and: [{status: true}]
    });

    return res.json({
        msg: 'Search...',
        total: users.length,
        results: users
    });   
};

const searchCategories = async (term = '', res = response)=>{
    const isMongoID = ObjectId.isValid(term);

    if(isMongoID){        
        const category = await Category.findById(term);
        return res.json({
            msg: 'Search...',
            results: category ? [category] : []
        });        
    }

    //Regular expresion case insensitive and flexible match
    const regex = new RegExp(term, 'i');

    //search by email or name
    const categories = await Category.find({name: regex });

    return res.json({
        msg: 'Search...',
        total: categories.length,
        results: categories
    });   
};

const searchProducts = async (term = '', res = response)=>{
    const isMongoID = ObjectId.isValid(term);

    if(isMongoID){        
        const product = await Product.findById(term).populate('category', 'name').populate('user', 'name');
        return res.json({
            msg: 'Search...',
            results: product ? [product] : []
        });        
    }

    //Regular expresion case insensitive and flexible match
    const regex = new RegExp(term, 'i');

    //search by email or name
    const products = await Product.find({name: regex }).populate('category', 'name').populate('user', 'name');

    return res.json({
        msg: 'Search...',
        total: products.length,
        results: products
    });   
};


const search = (req, res) => {

    const { collection, term } = req.params;

    if(!collectionsAllowed.includes(collection)){
        return res.status('400').json({
            msg: 'Collection not allowed',
            collectionsAllowed
        });
    };

    switch(collection){
        case 'products':
            searchProducts(term, res);
            break; 

        case 'categories':
            searchCategories(term, res);
            break; 

        case 'users':
            searchUsers(term, res);
            break; 

        default:
            return res.status('500').json({
                msg: 'Search not avaliable',
            });
    }

}

module.exports = {
    search,
}