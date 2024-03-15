const { Schema, model, models } = require("mongoose");

const usrsSchema = new Schema(
  {
    eNombre: {
      type: [String],
      required: [true, "El nombre es requerido"],
      //unique: [true, "El nombre no puede ser igual"], // Lo que hace es que manda un error si se repite
      trim: true, // Lo que hace es que borra los espacios del final e inicio
    },
    eApeP: {
      type: String,
      required: [true, "El Apellido Paterno es requerido"],
      //unique: true,
      trim: true,
    },
    eApeM: {
      type: String,
      required: [true, "El Apellido Materno es requerido"],
      //unique: true,
      trim: true,
    },
    //eRol: "adm/sup/usr", // Atributo lo tiene todos los empleado, catalogo
    //eNomUsr: "jonhDoe", // Atributo lo tiene todos los empleado
    //eEdad: 19, // Atributo lo tiene todos los empleado
    //eNumero: 1234567890, // Atributo lo tiene todos los empleado
    //eCorreo: "jonh@doe.com", // Atributo lo tiene todos los empleado
    //efechaRegistro: "02/02/2024", // Atributo lo tiene todos los empleado
    //auSede: "Leon", // Atributo de administradores y empleado, este se tomara de un catalogo
    //uArea: "Mantenimiento", //Atributo de empleado, este se tomara de un catalogo
    //uTurno: "4 / 5", // Atributo de empleado, este se tomara de un catalogo
  },
  {
    timestamps: true /* Lo que hace es que agrega el campo de fecha de creacion y actualizacion */,
  },
);
export default models.Usrs || model("Usrs", usrsSchema);
