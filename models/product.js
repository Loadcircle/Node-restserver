const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        //error message
        required: [true, 'Name is required'],
    },
    img: {
        type: String
    },
    price: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
    },
    stock: {
        type: Number,
        default: 0,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    status: {
        type: Boolean,
        default: true,
    }
});

ProductSchema.methods.toJSON = function(){
    //separate __v and password from object response
    const {__v, status, ...product } = this.toObject();
    return product;
}

module.exports = model('Product', ProductSchema);