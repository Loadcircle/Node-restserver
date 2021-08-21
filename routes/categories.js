const {Router} = require('express');
const { check } = require('express-validator');
const { categories, category, createCategory, updateCategory, deleteCategory } = require('../controllers/categories');
const { validateJWT } = require('../middlewares');
const { validateFields } = require('../middlewares/valdiateFields');

const router = Router();

router.get('/', categories);

router.get('/:id', category);

router.post('/createCategory', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields,
], createCategory);

router.put('/updateCategory/:id', updateCategory);

router.delete('/deleteCategory/:id', deleteCategory);


module.exports = router;