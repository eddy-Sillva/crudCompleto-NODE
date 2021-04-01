const{Schema,model}=require("mongoose");

const usuarioSchema = Schema({
    nombre:{type:String,
    require:[true,"El nombre es requerido"]
    },

    correo:{type:String,
    require:[true,"El correo es requerido"],
    unique:true},

    contrasenia:{type:String,
        require:[true,"la contraseña es requerido"]},

    imagen:{type:String},

    roles:{type:String,require:[true],
    emun:['ADMIN_ROLE','USER_ROLE']},

    estado:{type:Boolean,default:true},

    google:{type:Boolean,default:false},

})

module.exports = model('Usuario',usuarioSchema);
