// Usando o expresse pra criar e configurar o servidor
const express = require("express");
const server = express();

const db = require("./db"); // db = db.js

// const ideas = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         title: "Cursos de Programação",
//         category: "Estudo",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint beatae corrupti cum",
//         url: "https://google.com"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
//         title: "Exercícios",
//         category: "Saúde",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint beatae corrupti cum",
//         url: "https://google.com"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//         title: "Meditação",
//         category: "Mentalidade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint beatae corrupti cum",
//         url: "https://google.com"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729021.svg",
//         title: "Games",
//         category: "diversão",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint beatae corrupti cum",
//         url: "https://google.com"
//     },
// ]

// Configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"));

// Habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

// Configuração do nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// Criando uma rota
// capturando o pedido para responder
server.get("/", function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados!");
        } else {
            // reverse inverte a ordem dos elementos em uma matriz
            const reversedIdeas = [...rows].reverse();// os 3 pontos tá referindo as dados de <rows>;

            let lastIdeas = [];
            for (let idea of reversedIdeas) {
                if (lastIdeas.length < 2) {
                    lastIdeas.push(idea);// push adiciona um novo item a uma matriz
                }
            }
            
            return res.render("index.html", { ideas: lastIdeas });
        }
    })
})

server.get("/ideias", function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados!");
        } else {
            const reversedIdeas = [...rows].reverse();// os 3 pontos tá referindo aos dados de <rows>;

            return res.render("ideias.html", { ideas: reversedIdeas });
        }
    })
})

server.post("/", function(req, res) {
    // return res.send("OK");
    //console.log(req.body);

    // Inserir dado na tabela
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
     ) VALUES (?,?,?,?,?);      
     `

     const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

     db.run(query, values, function(err) {
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados!");
        } else {
            return res.redirect("/ideias");
        }
    });
})

// Lingando servidor na porta 3000
server.listen(3000);