const {Category} = require('../models')
const categories =  async (req, res)=>{
    //get public categories
    res.json({
        msg: 'Categories get'
    });
}

const category = async (req, res)=>{
    //get one categorie
    res.json({
        msg: 'Categorie get'
    });
}

//private TOKEN
const createCategory = async (req, res)=>{
    const name = req.body.name.toUpperCase();
    
    const categoryExist = await Category.findOne({name});

    if(categoryExist){
        return res.json({
            msg: 'Category already exist',
            categoryExist
        });
    }
    
    const data = {
        name, 
        status: true,
        user: req.user._id
    }

    const category = new Category(data);

    await category.save();

    res.json({
        msg: 'New Category created',
        category
    });
}

//private TOKEN
const updateCategory = async (req, res)=>{
    //Update categorie
    res.json({
        msg: 'updateCategorie put'
    });
}

//private ADMIN ONLY
const deleteCategory = async (req, res)=>{
    //Delete categorie
    res.json({
        msg: 'deleteCategorie delete'
    });
}


module.exports = {
    categories,
    category,
    createCategory,
    updateCategory,
    deleteCategory
}