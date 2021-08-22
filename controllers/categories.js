const {Category} = require('../models')

const categories =  async (req, res)=>{
    const query = {status: true}
    const {limit = 5, from = 0} = req.query;

    try {
        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
            .populate('user')
            .skip(Number(from))
            .limit(Number(limit)), 
        ]);
    
        //get public categories
        return res.json({
            msg: 'Categories get',
            from,
            limit,
            total,
            categories
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server Error'
        });
    }
}

const category = async (req, res)=>{
    const {id} = req.params;
    
    const category = await Category.findById(id)
    .populate('user');

    //get one Category
    res.json({
        msg: 'Category get',
        id,
        category
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
    const name = req.body.name.toUpperCase();
    const {id} = req.params;

    const data = {
        name, 
        user: req.user._id,
        status: true,
    }

    const category = await Category.findByIdAndUpdate(id, data, {new: true});

    //Update Category
    res.json({
        msg: 'updateCategorie put',
        category
    });
}

//private ADMIN ONLY
const deleteCategory = async (req, res)=>{
    const {id} = req.params;

    //Delete User
    // const user = await User.findByIdAndDelete(id);

    const category = await Category.findByIdAndUpdate(id, {status: false}, {new:true});

    res.json({
        msg: 'deleteCategory - controller',
        category,
    });
}

module.exports = {
    categories,
    category,
    createCategory,
    updateCategory,
    deleteCategory
}