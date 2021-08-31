const validateFile = (req, res, next)=>{

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'No file to upload - file'
        });
    }

    next();

};

module.exports = {
    validateFile,
}