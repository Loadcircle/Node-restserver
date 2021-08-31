const validateFields = require('../middlewares/valdiateFields');
const validateJWT = require('../middlewares/validate-jwt');
const validateUserRole = require('../middlewares/validateUserRole');
const validateFile = require('../middlewares/validate-file');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateUserRole,
    ...validateFile
}; 