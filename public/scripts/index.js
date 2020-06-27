//Pegar o botão
const buttonSearch = document.querySelector("#page-home main a")
//Pega o modal
const modal = document.querySelector("#modal")
//Pega o a que vai fechar o modal X
const close = document.querySelector("#modal .header a")


//adiciona uma função de click para ativar o modal
buttonSearch.addEventListener("click", () => {
  //Remove a classe hide, fazendo abrir o modal
  modal.classList.remove("hide")
})

//adiciona uma função de click para fechar o modal
close.addEventListener("click", () => {
  //Remove a classe hide, fazendo abrir o modal
  modal.classList.add("hide")
})
