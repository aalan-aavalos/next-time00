import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export async function connectDB() {
  // Si la conexion ya existe entonces no la vuelve a hacer
  if (conn.isConnected) {
    return;
  }

  const db = await connect(process.env.MONGODB_URI);
  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => {
  console.log("Mongoose is connected");
});

 
connection.on("error", (err) => {
  console.log("Mongoose connection error", err);
});
