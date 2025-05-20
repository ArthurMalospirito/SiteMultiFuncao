
//#region Select Menu

window.onload = function() {
    selectMenu(botaoShop);
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

function clicar() {

    imgBotaoClicker.style.width=(proporcaoImgClicker*0.99)+"px"

}

function soltouClick() {

    imgBotaoClicker.style.width=proporcaoImgClickerTexto

}

//#endregion

//#region TESTES EXCLUIR DEPOIS
const TESTE = document.getElementById("itemBebidasSmag")
const teste2 = document.getElementById("bloqueadoBebidasSmag")



window.onload = function(){
    teste2.style.display="none"
    TESTE.style.display="flex"

}


//#endregion