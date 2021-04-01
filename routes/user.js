const {Router} = require("express");
const { check } = require("express-validator");
const {usuariosGet,usuariosPost,usuariosPut,usuariosDelete} =require("../controllers/usuarios")
const {validarCampo}=require("../middlewares/validar-campos")
const router=Router();
router.get('/',usuariosGet);
router.put('/:id',[
    check("id","No es una id valido").isMongoId(),
    check("roles","No es un rol permitido").isIn(["ADMIN_ROLE","USER_ROLE"]),
    validarCampo
], usuariosPut);
router.post('/',[
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("contrasenia","La contraseña es obligatorio con mas de 6 letras").isLength({min:7}),
    check("correo","El correo no es valido").isEmail(),
    check("roles","No es un rol permitido").isIn(["ADMIN_ROLE","USER_ROLE"]),
    validarCampo
] ,usuariosPost);
router.delete('/:id',[
    check("id","No es una id valido").isMongoId(),
    validarCampo
],usuariosDelete);
module.exports = router;