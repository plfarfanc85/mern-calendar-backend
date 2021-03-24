// Todas tienen que pasar por la validacion del JWT

const { check } = require("express-validator");

const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");

const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");

const { Router } = require("express");
const { isDate } = require("../helpers/isDate");
const router = Router();

// todas las peticiones van a pasar por el middleware validarJWT, o sea todas las petciones deben de tener su token
router.use(validarJWT);

// Obtener eventos
router.get("/", getEventos);

// Crear un nuevo evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

// Actualizar evento
router.put("/:id", actualizarEvento);

// Borrar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
