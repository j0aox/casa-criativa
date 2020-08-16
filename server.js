// Usando o expresse pra criar e configurar o servidor
const express = require("express");
const server = express();

// Configurar arquivos estáticos (css, js, index)
server.use(express.static("public"));

// Criando uma rota
// capturando o pedido para responder
server.get("/", function(req, res) {
    return res.sendFile(__dirname + "/index.html");
})

server.get("/ideias", function(req, res) {
    return res.sendFile(__dirname + "/ideias.html");
})

// Lingando servidor na porta 3000
server.listen(3000);