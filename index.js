const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");
require("dotenv").config();

//console.log(process.env);

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// habilitar la carpeta public - use es un middleware
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Rutas
// todo lo que routes/auth vaya a exportar lo va a habilitar en la ruta /api/auth
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${4000}`);
});
