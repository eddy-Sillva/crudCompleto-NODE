const {response} =require("express");
const usuariosGet=(req,res=response) =>{
    const quey=req.query;
    res.json({
        ok:true,
        msg:"mi json peticion get controlador"
    });
}
const usuariosPost=(req,res=response) =>{
    const body=req.body;
    res.json({
        quey,
        body
    });
}
const usuariosPut=(req,res=response) =>{
    const id=req.params.id;
    res.json({
        id,
        ok:true,
        msg:"mi json peticion put controlador"
    });
}
const usuariosDelete=(req,res=response) =>{
    res.json({
        ok:true,
        msg:"mi json peticion delete controlador"
    });
}

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}