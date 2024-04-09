// src\models\turnos.js

const { Schema, model } = require("mongoose");

const turnoSchema = new Schema(
  {
    tipo: {
      type: String,
      required: true,
    },
    motivo: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      default: "Pendiente",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Turno", turnoSchema);
