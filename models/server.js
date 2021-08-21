const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');
require('dotenv').config();

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
        this.categoriesPath = '/api/categories';

        //Connect to DB
        this.database();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }
    async database(){
        await dbConection()
    }
    middlewares(){
        //Public folder
        this.app.use(express.static('public'));

        //Read and parse body
        this.app.use(express.json());

        //cors middleware
        this.app.use(cors());
    }
    routes(){        
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/user'));
        this.app.use(this.categoriesPath, require('../routes/categories'));
    }
    listen(){        
        this.app.listen(this.port, ()=>{
            console.log(`Runnin on port ${this.port}`);
        });
    }
}

module.exports = Server;