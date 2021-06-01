// Importaciones de terceros
import dotenv from "dotenv";

// Importaciones propias
import Server from "./models/server";

// Configurar dot.env
dotenv.config();


const server = new Server();
server.listen();