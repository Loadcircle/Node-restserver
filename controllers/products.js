const {Product} = require('../models')

const products =  async (req, res)=>{
    const query = {status: true}
    const {limit = 5, from = 0} = req.query;

    try {
        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
            .populate('user')
            .populate('category')
            .skip(Number(from))
            .limit(Number(limit)), 
        ]);
    
        //get public products
        return res.json({
            msg: 'Products get',
            from,
            limit,
            total,
            products
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server Error'
        });
    }
}

const product = async (req, res)=>{
    const {id} = req.params;
    
    const product = await Product.findById(id)
    .populate('user')
    .populate('category');

    //get one product
    res.json({
        msg: 'Product get',
        id,
        product
    });
}

//private TOKEN
const createProduct = async (req, res)=>{    
    const {name, stock, user, status, ...rest} = req.body;
    rest.name = name.toUpperCase();
    rest.user = req.user._id;

    if(stock) rest.stock = Number(stock);
    
    const productExist = await Product.findOne({name: rest.name});

    if(productExist){
        return res.json({
            msg: 'Product already exist',
            productExist
        });
    }
    
    const product = new Product(rest);

    await product.save();

    res.json({
        msg: 'New Product created',
        product
    });
}

//private TOKEN
const updateProduct = async (req, res)=>{
    const {id} = req.params;
    const {name, stock, user, status, ...rest} = req.body;
    rest.name = name.toUpperCase();
    rest.status = true;
    rest.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, rest, {new: true});

    //Update Product
    res.json({
        msg: 'updatedProduct put',
        product
    });
}

//private ADMIN ONLY
const deleteProduct = async (req, res)=>{
    const {id} = req.params;

    const product = await Product.findByIdAndUpdate(id, {status: false}, {new:true});

    res.json({
        msg: 'deleteProduct - controller',
        product,
    });
}

module.exports = {
    products,
    product,
    createProduct,
    updateProduct,
    deleteProduct
}