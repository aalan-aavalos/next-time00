const { Schema, model, models } = require("mongoose");

const usrsSchema = new Schema(
  {
    eNombre: {
      type: String,
      required: [true, "El nombre es requerido"],

      //unique: [true, "El nombre no puede ser igual"], // Lo que hace es que manda un error si se repite
      trim: true, // Lo que hace es que borra los espacios del final e inicio
    },
    eApeP: {
      type: String,
      required: [true, "El Apellido Paterno es requerido"],
      //unique: true,
      // default: "N/A",
      trim: true,
    },
    eApeM: {
      type: String,
      required: [true, "El Apellido Materno es requerido"],
      //unique: true,
      //default: "N/A",
      trim: true,
    },
    eRol: {
      type: String,
      required: [true, "El rol es requerido"],
      //unique: true,
      trim: true,
    },
    //eNomUsr: "jonhDoe", // Atributo lo tiene todos los empleado
    eEdad: {
      type: Number,
      required: [true, "La edad es requerido"],
      //unique: true,
      trim: true,
    }, // Atributo lo tiene todos los empleado
    eNumero: {
      type: Number,
      required: [true, "El numero de telefono es requerido"],
      //unique: true,
      trim: true,
    }, // Atributo lo tiene todos los empleado
    eCorreo: {
      type: String,
      required: [true, "El correo es requerido"],
      //unique: true,
      trim: true,
    }, // Atributo lo tiene todos los empleado

    auSede: {
      type: String,
      //required: [true, "El correo es requerido"],
      //unique: true,
      default: "N/A",
      trim: true,
    }, // Atributo de administradores y empleado, este se tomara de un catalogo
    uArea: {
      type: String,
      //required: [true, "El correo es requerido"],
      //unique: true,
      default: "N/A",
      trim: true,
    }, //Atributo de empleado, este se tomara de un catalogo
    uTurno: {
      type: String,
      //required: [true, "El correo es requerido"],
      //unique: true,
      default: "N/A",
      trim: true,
    }, // Atributo de empleado, este se tomara de un catalogo
  },
  {
    timestamps: true /* Lo que hace es que agrega el campo de fecha de creacion y actualizacion */,
  }
);
export default models.Usrs || model("Usrs", usrsSchema);
