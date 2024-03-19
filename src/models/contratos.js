const { Schema, model, models } = require("mongoose");

const contratoSchema = new Schema(
  {
    tipo_contrato:{ 
      type: String,
      required: [true, "El Tipo de contrato es requerido"],
      //unique: [true, "El nombre no puede ser igual"], // Lo que hace es que manda un error si se repite
      trim: true, // Lo que hace es que borra los espacios del final e inicio
    },
    duracion_jornada: {
      type: String,
      required: [true, "Es necesario que indiques el horario  "],
      //unique: true,
      trim: true,
    },
      hora_inicioFin:{
      type: String,
      required: [true, "El turno es requerido"],
      //unique: true,
      trim: true,
    },
  },
  {
    timestamps: true /* Lo que hace es que agrega el campo de fecha de creacion y actualizacion */,
  },
);
export default models.Contrato || model("Contrato", contratoSchema);