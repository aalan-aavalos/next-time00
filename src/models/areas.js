const { Schema, model, models } = require("mongoose");

const areasSchema = new Schema(
  {
    tipoArea: {
      type: String,
      required: [true, "El area es requerida"],
      //unique: true,
      trim: true,
    },
    aNombre: {
      type: String,
      required: [true, "El nombre del area es requerido"],
      unique: [true, "El nombre no puede ser igual"], // Lo que hace es que manda un error si se repite
      trim: true, // Lo que hace es que borra los espacios del final e inicio
    },
   
  
  },
  {
    timestamps: true /* Lo que hace es que agrega el campo de fecha de creacion y a;ctualizacionv  */,
  },
);
export default models.Areas || model("Areas", areasSchema);
