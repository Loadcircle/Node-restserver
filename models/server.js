const express = require('express');
const cors = require('cors')
require('dotenv').config();

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
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
        this.app.use(this.usersPath, require('../routes/user'));
    }
    listen(){        
        this.app.listen(this.port, ()=>{
            console.log(`Runnin on port ${this.port}`);
        });
    }
}

module.exports = Server;