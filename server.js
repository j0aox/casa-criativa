// Usando o expresse pra criar e configurar o servidor
const express = require("express");
const server = express();

// Configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"));

// Configuração do nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint beatae corrupti cum",
        url: "https://google.com"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint beatae corrupti cum",
        url: "https://google.com"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint beatae corrupti cum",
        url: "https://google.com"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729021.svg",
        title: "Games",
        category: "diversão",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint beatae corrupti cum",
        url: "https://google.com"
    },
]

// Criando uma rota
// capturando o pedido para responder
server.get("/", function(req, res) {

    // reverse inverte a ordem dos elementos em uma matriz
    const reversedIdeas = [...ideas].reverse();// os 3 pontos tá referindo as dados de <ideas>;

    let lastIdeas = [];
    for (let idea of reversedIdeas) {
        if (lastIdeas.length < 2) {
            lastIdeas.push(idea);// push adiciona um novo item a uma matriz
        }
    }

    //lastIdeas = lastIdeas.reverse();

    return res.render("index.html", { ideas: lastIdeas });
})

server.get("/ideias", function(req, res) {

    const reversedIdeas = [...ideas].reverse();// os 3 pontos tá referindo as dados de <ideas>;


    return res.render("ideias.html", { ideas: reversedIdeas });
})

// Lingando servidor na porta 3000
server.listen(3000);