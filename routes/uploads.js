const {Router} = require('express');
const { check } = require('express-validator');
const { uploadFileController, updateImage, getImage, updateImageCloudinary } = require('../controllers/uploads');
const { collectionsAllowed } = require('../helpers/db-validator');
const { validateFields, validateFile } = require('../middlewares');

const router = Router();

router.post('/', validateFile, uploadFileController);

router.get('/:collection/:id', [
    check('id', 'ID format is not valid').isMongoId(),
    check('collection').custom( c=> collectionsAllowed(c, ['users', 'products'])),
    validateFields
], getImage);

router.put('/:collection/:id', [
    validateFile,
    check('id', 'ID format is not valid').isMongoId(),
    check('collection').custom( c=> collectionsAllowed(c, ['users', 'products'])),
    validateFields
], updateImageCloudinary);
// ], updateImage);

module.exports = router;