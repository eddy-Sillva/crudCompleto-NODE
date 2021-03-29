const express=require('express');
const cors=require('cors');

class Server{
    constructor(){
        this.app=express();
        this.usuariosPath='/api/usuarios';
        // middelwares funcion que se ejecuta cuando se levanta el servidor del
        this.middelwares();
        //rutas de mi aplicacion
        this.rutas();
    }
    middelwares(){
        //cors
        this.app.use(cors());
        // lectura y parseo del body
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static("public"))
    }

    rutas(){
       this.app.use(this.usuariosPath,require("../routes/user"))
    }

    puerto(){
        this.app.listen(3000);
    }
}

module.exports =Server;