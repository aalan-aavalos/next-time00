const { Schema, model, models } = require("mongoose");

const solicitudSchema = new Schema(
  {
    fechaI: {
      type: Date,
      trim: true,
    },
    fechaF: {
      type: Date,
      trim: true,
    },
    motivo: {
      type: String,
      trim: true,
    },
    estado: {
      type: String,
      trim: true,
    },
    eCorreo: {
      type: String,
      trim: true,
    },
    tipo: {
      type: String,
      trim: true,
    },
    eNombre: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true /* Lo que hace es que agrega el campo de fecha de creacion y actualizacion */,
  }
);
export default models.Solicitudes || model("Solicitudes", solicitudSchema);
