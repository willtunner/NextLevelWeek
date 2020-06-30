
//Popula Estados/Cidades pela api do IBGE
function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");//seleciona o combo com nome de uf

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")//faz uma varredura no site api ibge pegando os estados
    .then(res => res.json())//função anonima que retorna uma função no caso salva na vareavel res e converte para json
    .then(states => {

      //pega os estados 27 no total e salva em state cada estado
      for (const state of states) {
        //ufSelect.innerHTML = ufSelect.innerHTML + `<option value="1">valor</option>`
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`//essa forma quer dizer o mesmo que o de cima porem mais curta
      }
    })
}

populateUFs()//executa a função

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")
  //console.log(event.target.value)
  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  //resolve bug de escolher um estado e depois um outro estado e mantinha as cidades do primeiro estado escolhido no segundo estado
  citySelect.innerHTML = "<option value>Selecione a cidade</option>"//limpa o campo de cidade fora do loop
  citySelect.disabled = true//Habilita para selecionar o combo novamente

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`//essa forma quer dizer o mesmo que o de cima porem mais curta
      }
      citySelect.disabled = false
    })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

//Itens de coleta

//- pega todos os li's
const itemsToCollect = document.querySelectorAll(".itens-grid li")/*Pega todos li dentro de .items-grid */

//pega o input hidden dos items que começa vazio
const collectedItems = document.querySelector("input[name=items]")


for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

//let pode atualizar posteriorment, const n~ão sobrescreve
let selectedItens = [] //vareavel array para armazenar os itens selecionados

function handleSelectedItem(event) {
  // console.log(event.target.dataset.id)//pega somente o id dos li quando clica por cauda do data-id colocado neles e pega pelo dataset
  const itemLi = event.target //Pega o component li

  //Adcionar ou remover uma classe com java script
  itemLi.classList.toggle("selected")

  const itemId = event.target.dataset.id//pega o id do item selecionado

  console.log("ITEM ID: "+ itemId)

  //verificar se existem itens selecionados, se sim

  //pegar os itens selecionados
  //quando clica procura o index = id
  //const alreadySelected = selectedItens.findIndex(function(item){//poderia ser assim
  const alreadySelected = selectedItens.findIndex(item => {//mas simplifica assim
    const itemFound = item == itemId//pega o id pelo itemID compara com o compara com o item se for igual true
    return itemFound//retorna true e salva no alreadySelected
  })
  //se já estiver selecionado, 
  if(alreadySelected >= 0){
    //tirar da seleção
    const filteredItens = selectedItens.filter( item => {
      const itemIsDifferent = item != itemId //false - se o id do item que estiver no selectedItens for igual, ou seja está no array do selectedItens remove
      return itemIsDifferent//filtra o item do array removendo
    })

    selectedItens = filteredItens

  }else{
    //se não tiver adicionado, adicionar na seleção
    selectedItens.push(itemId)

  }

  console.log("selectedItens: "+ itemId)


  //atualizar o campo escondido com os dados selecionados
  collectedItems.value = selectedItens



}