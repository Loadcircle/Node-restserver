const mongoose = require('mongoose');

const dbConection = async()=>{
    
    try {
        
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        console.log('conexion realizada');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos');
    }

}

module.exports = {
    dbConection
}