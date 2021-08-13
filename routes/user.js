const {Router} = require('express');
const { check } = require('express-validator');
const { 
    usersGet, 
    usersPut, 
    usersPost, 
    usersDelete 
} = require('../controllers/users');
const { isValidRole, isEmailExist, isUserExist } = require('../helpers/db-validator');
const { validateFields } = require('../middlewares/valdiateFields');

const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('email', 'Email format is incorrect').isEmail(),
    check('email').custom( isEmailExist ),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({min: 6}),
    // check('role', 'Role is not valid').isIn('ADMIN_ROLE','USER_ROLE'),
    check('role').custom( isValidRole ),
    validateFields
], usersPost);

router.put('/:id',[
    check('id', 'ID format is not valid').isMongoId(),
    check('id').custom(isUserExist),
    validateFields
], usersPut);

router.delete('/:id',[
    check('id', 'ID format is not valid').isMongoId(),
    check('id').custom(isUserExist),
    validateFields
], usersDelete);

module.exports = router;