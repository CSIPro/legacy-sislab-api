const { Schema, model } = require("mongoose");

const PracticaSchema = new Schema({
  number: {
    type: String,
    required: [true, "El número de la práctica es obligatorio."],
  },
  name: {
    type: String,
    required: [true, "El nombre de la práctica es obligatorio."],
  },
  reagent: {
    type: Map,
    required: [false],
  },
  equipment: {
    type: [String],
    required: [false],
  },
  residue: {
    type: [Map],
    required: [false],
  },
});

module.exports = model("Practica", PracticaSchema);
