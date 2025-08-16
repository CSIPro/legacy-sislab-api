const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      buscar: "/api/buscar",
      grupos: "/api/grupos",
      usuarios: "/api/usuarios",
      carreras: "/api/carreras",
      dias: "/api/dias",
      horas: "/api/horas",
      laboratorios: "/api/laboratorios",
      materias: "/api/materias",
      practicas: "/api/practicas",
      solicitudes: "/api/solicitudes",
      roles: "/api/roles",
    };

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(
      cors({
        origin: "*",
      })
    );
    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.grupos, require("../routes/grupos"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
    this.app.use(this.paths.carreras, require("../routes/carreras"));
    this.app.use(this.paths.dias, require("../routes/dias"));
    this.app.use(this.paths.horas, require("../routes/horas"));
    this.app.use(this.paths.laboratorios, require("../routes/laboratorios"));
    this.app.use(this.paths.materias, require("../routes/materias"));
    this.app.use(this.paths.practicas, require("../routes/practicas"));
    this.app.use(this.paths.solicitudes, require("../routes/solicitudes"));
    this.app.use(this.paths.roles, require("../routes/roles"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
