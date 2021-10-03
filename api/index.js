const express = require("express");
const routes = require("./routes");

const server = express();
server.use(express.json(), routes);

server.listen(3000, () => console.log("API ON AIR"));

module.exports = server;
