const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }
});

module.exports = model('Category', CategorySchema)