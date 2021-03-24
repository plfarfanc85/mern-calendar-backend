/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const {
  crearUsuarios,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

// el codigo crece mucho más rapidamente, con solo 3 request ya lleva muchas lineas de codigo
// entonces lo mejor es separar la ruta del controlador que va a menejar esa ruta, esto lo vamos a hacer con archivos independientes

// nuevo usuario
// podemos implementar middlewares especificos a una petición
router.post(
  "/new",
  [
    // middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsuarios
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);

// vamos a generar un JWT - Jeison web token que nos va permitir mantener autenticados a nuestros usuarios de forma pasiva
// es decir el servidor no va a tener una sesión del usuario
router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
