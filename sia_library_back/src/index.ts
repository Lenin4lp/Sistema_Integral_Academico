//? EJECUTABLE DEL SERVIDOR

import app from "./app";

// Se define el puerto. A Port se le da el valor que tiene Port en las variables de entorno o se le asigna el puerto 8080
const PORT = process.env.PORT || 8080;
// Se hace que la app escuche al puerto asignado
app.listen(PORT, () => console.log(`Ready from the port: ${PORT}`));
