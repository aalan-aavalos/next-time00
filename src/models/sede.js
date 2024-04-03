const { Schema, model, models } = require("mongoose");

const sedeSchema = new Schema(
  {
    nombreSede: {
      type: String,
      required: [true, "El nombre de la SEDE  es requerido"],
      //unique: [true, "El nombre no puede ser igual"], // Lo que hace es que manda un error si se repite
      trim: true, // Lo que hace es que borra los espacios del final e inicio
    },
    codigoPostal: {
      type: String,
      //unique: true,
      trim: true,
    },
    estado: {
      type: String,
      //unique: true,
      trim: true,
    },
    municipio: {
      type: String,
      //unique: true,
      trim: true,
    },
    Adminstradores: {
      type: [String],
      //unique: true,
      trim: true,
    },

  aNombre:{
      type: Array,
      trim: true,
    }

    
  },
  {
    timestamps: true /* Lo que hace es que agrega el campo de fecha de creacion y actualizacion */,
  },
);
export default models.Sede || model("Sede", sedeSchema);
