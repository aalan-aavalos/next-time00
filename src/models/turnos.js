// src\models\turnos.js

const { Schema, model } = require("mongoose");

const turnoSchema = new Schema(
  {
    turno: {
      type: String,
      trim: true,
    },
    tipo: {
      type: String,
    },
    motivo: {
      type: String,
    },
    eCorreo: {
      type: String,
    },
    eNombre: {
      type: String,
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
