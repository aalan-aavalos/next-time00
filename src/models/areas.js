const { Schema, model, models } = require("mongoose");

const areasSchema = new Schema(
  {
    aNombre: {
      type: String,
      required: [true, "El nombre del area es requerido"],
      //unique: [true, "El nombre no puede ser igual"], // Lo que hace es que manda un error si se repite
      trim: true, // Lo que hace es que borra los espacios del final e inicio
    },
    sNombre: {
      type: String,
      required: [true, "La sede es requerida"],
      //unique: true,
      trim: true,
    },
  
  },
  {
    timestamps: true /* Lo que hace es que agrega el campo de fecha de creacion y actualizacion */,
  },
);
export default models.Areas || model("Areas", areasSchema);
