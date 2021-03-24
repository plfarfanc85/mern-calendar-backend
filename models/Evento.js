const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
  title: {
    type: String,
  },
  notes: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId, // le va a decir a mongoose que es una referencia
    ref: "Usuario",
    required: true,
  },
});

// esto no hace modificaciones en la base de datos
// simplemente cambia la forma como se van a mostrar los parametros en la respuesta
EventoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Evento", EventoSchema);
