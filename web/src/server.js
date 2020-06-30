const express = require("express")//pega a função express e salva na vareavel
const server = express()//coloca a função express na variavel server

//Pegar o banco de dados
const db = require("./database/db.js")

//Configura pasta publica
server.use(express.static("public"))

//Habilitar o uso do body na nossa aplicação
server.use(express.urlencoded({extended: true}))

//Utilizando template Engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

//Configurar caminhos/rotas da minha aplicação
//Pagina inicial
//req = requisição
//res = resposta
server.get("/", (req, res) => {
  return res.render("index.html", { title: "Um titulo" })//só precisa isso pq configurou no nunjucks
})

//Pagina create-point via GET
server.get("/create-point", (req, res) => {
  // req.query: Query Strings da nossa url
  console.log(req.query)

  return res.render("create-point.html")
})

//Pagina create-point via POST
server.post("/savepoint", (req, res) => {
  //req.body: O corpo do formulário
  //precisa habilitar o body acima para funcionar
  //console.log(req.body)//para ver o que passa pelo formulário do front para o backend

  //INSERIR DADOS NO BANCO DE DADOS 

  //Query para inserir
  const query = `
      INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
      ) VALUES (?,?,?,?,?,?,?);
    `
  //Valores a ser inseridos      
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if (err) {
      return console.log(err)//se der erro mostra no console
      //console.log(err)
      //return res.send("Erro no cadastro!")//retorna erro para a tela Ex: ecrever INT em vez de INTO
    }

    //console.log("Requesição para o body"+req.body)
    console.log("Cadsatrado com sucesso")
    console.log(this)//imprime tudo que o sql fez para inserir

    return res.render("create-point.html", {saved: true})//DA O OK SOMENTE DEPOIS DO CADASTRO
  }

  db.run(query, values, afterInsertData)//inseri os dados
})

//Pagina search-results
server.get("/search", (req, res) => {

  const search = req.query.search

  if( search == ""){
    //Pesquisa vazia
    
    //mostrar a página html com os dados do banco
    return res.render("search-results.html", {total : 0})
  }

  //PEGAR DADOS DO BANCO DE DADOS E PASSAR PRO HTML
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err)//se der erro mostra no console
    }
    const total = rows.length
    //console.log("aqui estão seus registros")
    //console.log(rows)

    //mostrar a página html com os dados do banco
    return res.render("search-results.html", {places: rows, total})
  })
})

//inicia o servidor
server.listen(3000)