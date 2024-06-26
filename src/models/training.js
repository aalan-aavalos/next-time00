const { Schema, model, models } = require("mongoose");

const trainingSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "Se requiere un nombre"],
      trim: true, // Lo que hace es que borra los espacios del final e inicio
    },
    fechaI: {
      type: Date,
      required: [true, "La fecha de inicio es requerida"],
      trim: true, // Lo que hace es que borra los espacios del final e inicio
    },
    fechaF: {
      type: Date,
      required: [true, "La fecha de finalizacion es requerida"],
      //unique: true,
      trim: true,
    },
    motivo: {
      type: String,
      required: [true, "Se requiere un motivo de la solicitud"],
      //unique: true,
      trim: true,
    },
    Administradores: {
      type: [String],
      //unique: true,
      trim: true,
    },
    Empleados: {
      type: [String],
      //unique: true,
      trim: true,
    },
    eCorreo: {
      type: [String],
      trim: true,
    },
    tipo: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true /* Lo que hace es que agrega el campo de fecha de creacion y actualizacion */,
  }
);
export default models.Training || model("Training", trainingSchema);
