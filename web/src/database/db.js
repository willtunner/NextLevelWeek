//importar depencia do sqlite3
//verbose é para ver as mensagens do sql aparecendo no console
const sqlite3 = require("sqlite3").verbose()

//iniciar o banco
//caso não exista ele cria o arquivo do banco
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//#region 
//utilizar o objeto de banco de dados, para nossas operações
db.serialize(() => {

//   //criar uma tabela SQL
//   db.run(`
//           CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT, 
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//           );
//         `)

//   //Inserir os dados da tabela

//   //Query para inserir
  // const query = `
  //     INSERT INTO places (
  //       image,
  //       name,
  //       address,
  //       address2,
  //       state,
  //       city,
  //       items
  //     ) VALUES (?,?,?,?,?,?,?);
  //   `
  // //Valores a ser inseridos      
  // const values = [
  //   "https://image.freepik.com/fotos-gratis/transportador-para-classificar-residuos-de-lixo-por-pessoas-processamento-de-lixo_151992-23.jpg",
  //   "Papersider",
  //   "APinajés",
  //   "Nº 593",
  //   "Belém",
  //   "Pará",
  //   "Papéis e Papelão"
  // ]

  // function afterInsertData(err) {
  //   if (err) {
  //     return console.log(err)//se der erro mostra no console
  //   }

  //   console.log("Cadsatrado com sucesso")
  //   console.log(this)//imprime tudo que o sql fez para inserir
  // }


  // db.run(query, values, afterInsertData)//inseri os dados

//   //Consultar os dados da tabela
  // db.all(`SELECT * FROM places`, function(err, rows){
  //   if(err){
  //     return console.log(err)//se der erro mostra no console
  //   }

  //   console.log("aqui estão seus registros")
  //   console.log(rows)

  // })

  //Deletar dados da tabela
  // db.run(`DELETE FROM  places where id= ?`,[11], function(err){
  //   if(err){
  //     return console.log(err)//se der erro mostra no console
  //   }

  //   console.log("registro deletado com sucesso")
  //   //console.log(rows)

  // })
})//fim do serialize
//#endregion
