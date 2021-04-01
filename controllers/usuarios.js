const {response} =require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const usuariosGet=async (req,res=response) =>{
    const {limite=5,desde=0}=req.query;
    const [total,usuarios]=await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
    });
}
const usuariosPost=async (req,res=response) =>{
    const {nombre,correo,contrasenia,roles}=req.body;
    const usuarios=new Usuario({nombre,correo,contrasenia,roles});
    // verificar correo existe
    const existeEmil= await Usuario.findOne({correo});
    if(existeEmil){
        return res.status(400).json({
            msg:"Correo ya registrado"
        });
    }
    //encriptar contra
    const salt=bcrypt.genSaltSync();
    usuarios.contrasenia=bcrypt.hashSync(contrasenia, salt);
    await usuarios.save();
    res.json({
        usuarios
    });
}
const usuariosPut=async (req,res=response) =>{
    const {id}=req.params;
    const existeUsuarioPorId=await Usuario.findById(id);
    if(!existeUsuarioPorId){
        return res.status(400).json({
            error:"Este usuario no existe"
        });
    }
    const {_id,contrasenia,google,correo,...resto}=req.body;
    // validar contra base de datos
    if(contrasenia){
    const salt=bcrypt.genSaltSync();
    resto.contrasenia=bcrypt.hashSync(contrasenia, salt);
    }
    const usuarioDb= await Usuario.findByIdAndUpdate(id,resto);
    res.json({
        usuarioDb
    });
}
const usuariosDelete=async (req,res=response) =>{
    const {id}=req.params;
    const existeUsuarioPorId=await Usuario.findById(id);
    if(!existeUsuarioPorId){
        return res.status(400).json({
            error:"Este usuario no existe"
        });
    }
    const usuariQuitar=await Usuario.findByIdAndUpdate(id,{estado:false});

    res.json({
        usuariQuitar
    });
}

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}