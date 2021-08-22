const {Router} = require('express');
const { check } = require('express-validator');
const { products, product, createProduct, updateProduct, deleteProduct } = require('../controllers/products.js');
const { isProductExist, isCategoryExist } = require('../helpers/db-validator.js');
const { validateFields } = require('../middlewares/valdiateFields.js');
const { validateJWT } = require('../middlewares/validate-jwt.js');
const { validateUserAdmin } = require('../middlewares/validateUserRole.js');

const router = Router();

router.get('/', products);

router.get('/:id', [
    check('id', 'ID format is not valid').isMongoId(),
    check('id').custom(isProductExist),
    validateFields
], product);

router.post('/createProduct', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category format is not valid').isMongoId(),
    check('category').custom(isCategoryExist),
    check('stock', 'Stock must be a number').optional().isNumeric(),
    check('price', 'Price must be a number').optional().isNumeric(),
    validateFields,
], createProduct);

router.put('/updateProduct/:id', [
    validateJWT,
    check('id', 'ID format is not valid').isMongoId(),
    check('id').custom(isProductExist),
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category format is not valid').optional().isMongoId(),
    check('category').optional().custom(isCategoryExist),
    check('stock', 'Stock must be a number').optional().isNumeric(),
    check('price', 'Price must be a number').optional().isNumeric(),
    validateFields
], updateProduct);

router.delete('/deleteProduct/:id', [
    validateJWT,    
    validateUserAdmin,
    check('id', 'ID format is not valid').isMongoId(),
    check('id').custom(isProductExist),
    validateFields
], deleteProduct);

module.exports = router;