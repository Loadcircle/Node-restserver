const {Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role:{
        type: String,
        required: [true, 'Role is required']
    }
});

module.exports = {
    Role: model('Role', RoleSchema)
}