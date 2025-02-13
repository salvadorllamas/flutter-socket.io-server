const express = require("express");
const path = require("path");
require("dotenv").config();

// App de Express
const app = express();

// Node server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);

require('./sockets/socket');
// Public Path
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));



// Servidor escuchando en el puerto
const PORT = process.env.PORT || 3000;
server.listen(PORT, (err) => {
  if (err) throw new Error(err);
  console.log("Servidor corriendo en puerto", PORT);
});
