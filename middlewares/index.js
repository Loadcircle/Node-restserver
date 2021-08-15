const validateFields = require('../middlewares/valdiateFields');
const validateJWT = require('../middlewares/validate-jwt');
const validateUserRole = require('../middlewares/validateUserRole');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateUserRole
};