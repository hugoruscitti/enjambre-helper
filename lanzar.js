const carlo = require("carlo");
const path = require("path");
const fs = require("fs");
const ruta = "../spider-backend/spider/models/";

(async () => {
  const app = await carlo.launch({ width: 900, height: 600 });

  app.on("exit", () => process.exit());

  app.serveFolder(path.join(__dirname, "dist"));

  // Expose 'env' function in the web environment.
  await app.exposeFunction("carlo", _ => process.env);
  await app.exposeFunction("in_carlo", () => {
    return true;
  });

  await app.exposeFunction("obtener_archivos_model", () => {
    let archivos = fs.readdirSync("../spider-backend/spider/models/");
    archivos = archivos.filter(archivo => archivo.endsWith(".py"));

    let archivos_con_ruta = archivos.map(archivo => {
      return path.join(ruta, archivo);
    });

    let archivos_con_contenido = archivos_con_ruta.map(archivo => {
      return {
        archivo: path.basename(archivo),
        ruta: archivo,
        contenido: fs.readFileSync(archivo, "utf8")
      };
    });

    return archivos_con_contenido;
  });

  await app.load("index.html");
})();
