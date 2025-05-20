
let smagCoins=0

let SPS=1

//#region Select Menu

window.onload = function() {
    selectMenu(botaoShop);
}

function roundToDecimal(value,decimals) {
    let fator = Math.pow(10,decimals);
    return Math.round(value*fator) /fator;
}

const botaoShop = document.getElementById("botaoShop");
const botaoUpgrades = document.getElementById("botaoUpgrades");
const botaoConfig = document.getElementById("botaoConfig");

const displayShop = document.getElementById("telaShopId")
const displayUpgrade = document.getElementById("telaUpgradesId")
const displayConfig = document.getElementById("telaConfigId")

let menuEscolhido=""

function selectMenu(botaoClicado) {

    menuEscolhido=botaoClicado.value;

    mostarBotaoEscolhido(botaoClicado)

    switch (menuEscolhido) {

        case "shop":

            displayShop.style.display="grid"
            displayUpgrade.style.display="none"
            displayConfig.style.display="none"

        break;

        case "upgrades":

            displayShop.style.display="none"
            displayUpgrade.style.display="grid"
            displayConfig.style.display="none"

        break;

        case "config":

            displayShop.style.display="none"
            displayUpgrade.style.display="none"
            displayConfig.style.display="flex"

        break;

        default:
            alert("Deu erro aí, ô doido")

    }

}

const botoesSelecao = [botaoShop,botaoUpgrades,botaoConfig]

const corEscolhido = "rgba(147, 150, 155, 1)"
const corPadrao = "rgba(107, 110, 115, 1)"

function mostarBotaoEscolhido(botaoEscolhido) {

    for (botao of botoesSelecao) {
        if (botao===botaoEscolhido){
            botao.style.backgroundColor=corEscolhido

        }
        else{
            botao.style.backgroundColor=corPadrao
        }
    }

}



//#endregion

//#region Clicar
const proporcaoImgClicker=250
let proporcaoImgClickerTexto=proporcaoImgClicker+"px"

const botaoClicker = document.getElementById("botaoClicker");
const imgBotaoClicker = document.getElementById("imgBotaoClicker");

imgBotaoClicker.style.width=proporcaoImgClickerTexto

const smagCoinsDisplay = document.getElementById("smagCoins")

function clicar() {

    imgBotaoClicker.style.width=(proporcaoImgClicker*0.99)+"px"
    smagCoins+=1
    smagCoinsDisplay.innerHTML=smagCoins

}

function soltouClick() {

    imgBotaoClicker.style.width=proporcaoImgClickerTexto

}

//#endregion

//#region Comprar Itens

let precosItens = {
    "Dedo": 25,
    "Boto": 250,
    "Bebida": 2500
}

let qtdItens = {
    "Dedo": 0,
    "Boto": 0,
    "Bebida": 0
}

const btnComprarDedo=document.getElementById("comprarDedo")
btnComprarDedo.innerHTML="S$ "+precosItens["Dedo"]

const btnComprarBoto=document.getElementById("comprarBoto")
btnComprarBoto.innerHTML="S$ "+precosItens["Boto"]

const btnComprarBebida=document.getElementById("comprarBebida")
btnComprarBebida.innerHTML="S$ "+precosItens["Bebida"]

let multiplicadorPreco=1.1

function comprarItem(botaoClicado) {

    let valorBotao=botaoClicado.value
    console.log(valorBotao)

    if (smagCoins>=precosItens[valorBotao]) {
        smagCoins-=precosItens[valorBotao]
        smagCoinsDisplay.innerHTML=smagCoins
        precosItens[valorBotao]=roundToDecimal(precosItens[valorBotao]*1.1,0)
        botaoClicado.innerHTML="S$ "+precosItens[valorBotao]

        qtdItens[valorBotao]+=1

        let qtdParaAumentar = document.getElementById("qtd"+valorBotao)

        qtdParaAumentar.innerHTML="#"+qtdItens[valorBotao]

    }

}

//#endregion

//#region RODAR JOGO

//REVER DEPOIS!!!!!

// setTimeout(rodarJogo,1000)

// function rodarJogo() {
//     smagCoins+=SPS
//     smagCoinsDisplay.innerHTML=smagCoins
// }

//#endregion

//#region TESTES EXCLUIR DEPOIS
const TESTE = document.getElementById("itemBebidasSmag")
const teste2 = document.getElementById("bloqueadoBebidasSmag")



window.onload = function(){
    teste2.style.display="none"
    TESTE.style.display="flex"

}


//#endregion

