const { uploadFiles } = require("../helpers/upload-file");
const { Product, User } = require('../models');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const uploadFileController = async (req, res)=>{  

    try{
        const fileName = await uploadFiles(req.files);        
        res.json({
            msg: 'Uploaded File successfully',
            fileName,
        });        
    }catch(error){
        res.status(400).json({
            msg: error,
        });
    }
  
}

const updateImage = async (req, res)=>{
    const {id, collection} = req.params;

    let model;
    
    switch(collection){
        case 'users':            
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `User with id ${id} does not exist`,
                });
            };

        break;

        case 'products':
            model = await Product.findById(id);
            console.log(model);
            if(!model){
                return res.status(400).json({
                    msg: `Product with id ${id} does not exist`,
                });
            };

        break;

        default:
            return res.status(500).json({msg: `Internal server error - ${collection}`})
    }
    
    try{
        const fileName = await uploadFiles(req.files, collection )
        
        //clear existing image
        if(model.img){
            const pathImage = path.join(__dirname, '../uploads', collection, model.img);
            if(fs.existsSync(pathImage)){
                fs.unlinkSync(pathImage);
            }
        };

        model.img = fileName;
    
        await model.save();
    
        res.json({
            msg: 'updateImage',
            model,
        });        
    }catch(error){
        res.status(400).json({
            msg: error,
        });
    }

  
}

const getImage = async (req, res) =>{
    const {id, collection} = req.params;

    let model;    
    switch(collection){
        case 'users':            
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `User with id ${id} does not exist`,
                });
            };
        break;

        case 'products':
            model = await Product.findById(id);
            console.log(model);
            if(!model){
                return res.status(400).json({
                    msg: `Product with id ${id} does not exist`,
                });
            };
        break;

        default:
            return res.status(500).json({msg: `Internal server error - ${collection}`})
    }
       
    if(model.img){
        //Return local img
        // const pathImage = path.join(__dirname, '../uploads', collection, model.img);
        // if(fs.existsSync(pathImage)){
        //     return res.sendFile(pathImage)
        // }

        //Return cloudinary img
        return res.json({
            url: model.img,
        });
    };

    const placeholder = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(placeholder)
    
}

//Cloudinary versions ----------------------------------------------------

const updateImageCloudinary = async (req, res)=>{
    const {id, collection} = req.params;

    let model;
    
    switch(collection){
        case 'users':            
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `User with id ${id} does not exist`,
                });
            };
        break;

        case 'products':
            model = await Product.findById(id);
            console.log(model);
            if(!model){
                return res.status(400).json({
                    msg: `Product with id ${id} does not exist`,
                });
            };
        break;

        default:
            return res.status(500).json({msg: `Internal server error - ${collection}`})
    }
        
    //clear existing image
    if(model.img){
        const arr = model.img.split('/');
        const imgName = arr[arr.length-1];
        const [publicId] = imgName.split('.');
        cloudinary.uploader.destroy(publicId);
    };
    const {tempFilePath} = req.files.file; 
    const {secure_url} = await cloudinary.uploader.upload( tempFilePath );

    model.img = secure_url;    
    await model.save();

    res.json({
        msg: 'updateImage',
        model,
    });        
      
}

module.exports = {
    uploadFileController,
    updateImage,
    getImage,
    updateImageCloudinary
}