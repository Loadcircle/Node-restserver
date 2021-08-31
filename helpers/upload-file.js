const path = require('path');
const {v4:uuidv4} = require('uuid');
const imgValidExt = ['jpg', 'png', 'jpeg', 'svg', 'gif'];

const uploadFiles = (files, folder = '', validExt = imgValidExt)=>{

    return new Promise((resolve, reject)=>{

        const {file} = files;

        const splitName = file.name.split('.');
        const fileExt = splitName[splitName.length-1];

        if(!validExt.includes(fileExt)){
            return reject(`File type ${fileExt} not valid, valid ext : ${validExt}`);
        };
        
        const tempName = uuidv4() + '.' + fileExt;        
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);
    
        
        file.mv(uploadPath, err=>{
            if (err){          
                return reject(err);
            };        
            return resolve(tempName);            
        });
    });
}

module.exports = {
    uploadFiles,
}