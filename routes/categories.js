const {Router} = require('express');
const { check } = require('express-validator');
const { categories, category, createCategory, updateCategory, deleteCategory } = require('../controllers/categories');
const { isCategoryExist } = require('../helpers/db-validator');
const { validateJWT, validateUserAdmin } = require('../middlewares');
const { validateFields } = require('../middlewares/valdiateFields');

const router = Router();

router.get('/', categories);

router.get('/:id', [
    check('id', 'ID format is not valid').isMongoId(),
    check('id').custom(isCategoryExist),
    validateFields
], category);

router.post('/createCategory', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields,
], createCategory);

router.put('/updateCategory/:id', [
    validateJWT,
    check('id', 'ID format is not valid').isMongoId(),
    check('id').custom(isCategoryExist),
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], updateCategory);

router.delete('/deleteCategory/:id', [
    validateJWT,    
    validateUserAdmin,
    check('id', 'ID format is not valid').isMongoId(),
    check('id').custom(isCategoryExist),
    validateFields
], deleteCategory);


module.exports = router;