const mongoose = require('mongoose');

const dbConexion=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/curso',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        });
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion de la base de datos');
    }
}

module.exports ={
    dbConexion
}