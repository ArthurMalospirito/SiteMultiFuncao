// 1 - TRANFORMAR ESTRUTURAS EM OBJETOS, CARA COISA UM OBJETO

// 2 - Fazer um negócio para mostrar os números bonito, ao milhão = 1.803M/1.115B/1.250T



//#region Variáveis Globais

const smagCoinsDisplay = document.getElementById("smagCoins")
let smagCoins=0

const SPSDisplay = document.getElementById("SPS")
let SPS=0

let poderCLick = 1
let multiplicadorClick = 1

class Estrutura {

    constructor(preco,qtd,SPS,multiplicador) {

        this.preco = preco
        this.qtd = qtd
        this.SPS = SPS
        this.multiplicador = multiplicador

    }

}
                        //Preco,Qtd,SPS,Multiplicador
const dedo = new Estrutura(10,0,0.1,1)
const boto = new Estrutura(250,0,5,1)
const bebida = new Estrutura(2500,0,20,1)

let estruturas = {
    "Dedo": dedo,
    "Boto": boto,
    "Bebida": bebida
}

let estruturasString = ["Dedo","Boto","Bebida"]

function calcularSPS() {

    let spsCalculo = 0

    for (let string of estruturasString) {

        spsCalculo+=estruturas[string].qtd*(estruturas[string].SPS*estruturas[string].multiplicador)

    }

    SPS = ajusteSmagCoinsDisplay(spsCalculo)
    SPSDisplay.innerHTML=SPS

}

function roundToDecimal(value,decimals) {
    let fator = Math.pow(10,decimals);
    return Math.round(value*fator) /fator;
}

function ajusteSmagCoinsDisplay(smagCoins) {

    let valorMostrar = ""

    if (smagCoins<Math.pow(10,3)) { //1k
        valorMostrar = roundToDecimal(smagCoins,2)
    }
    else if (smagCoins<Math.pow(10,6)) {//1M
        valorMostrar = roundToDecimal(smagCoins/Math.pow(10,3),2) + "K"
    }
    else if (smagCoins<Math.pow(10,9)) {//1B
        valorMostrar = roundToDecimal(smagCoins/Math.pow(10,6),2) + "M"
    }
    else if (smagCoins<Math.pow(10,12)) {//1T
        valorMostrar = roundToDecimal(smagCoins/Math.pow(10,9),2) + "B"
    }
    else if (smagCoins<Math.pow(10,15)) {//1Q
        valorMostrar = roundToDecimal(smagCoins/Math.pow(10,12),2) + "T"
    }
    else if (smagCoins<Math.pow(10,18)) {//1Q
        valorMostrar = roundToDecimal(smagCoins/Math.pow(10,15),2) + "Q"
    }



    else {
        valorMostrar="ACIMA DE TUDO"
    }


    return valorMostrar
}

//#endregion

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

    for (let botao of botoesSelecao) {
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

    smagCoins+=(poderCLick*multiplicadorClick)
    smagCoinsDisplay.innerHTML=ajusteSmagCoinsDisplay(smagCoins)
    

}

function soltouClick() {

    imgBotaoClicker.style.width=proporcaoImgClickerTexto

}

//#endregion

//#region Comprar Itens

//Mudando todos os valores de Preço
for (let string of estruturasString) {
    let SPSDisplayItem = document.getElementById("comprar"+string)
    SPSDisplayItem.innerHTML="S$ "+ajusteSmagCoinsDisplay(estruturas[string].preco)
}

let multiplicadorPreco=1.15

function comprarItem(botaoClicado) {

    let valorBotao=botaoClicado.value

    if (smagCoins>=estruturas[valorBotao].preco) {
        smagCoins-=estruturas[valorBotao].preco
        smagCoinsDisplay.innerHTML=ajusteSmagCoinsDisplay(smagCoins)
        
        estruturas[valorBotao].preco=roundToDecimal(estruturas[valorBotao].preco*multiplicadorPreco,2)
        botaoClicado.innerHTML="S$ "+ajusteSmagCoinsDisplay(estruturas[valorBotao].preco)

        estruturas[valorBotao].qtd+=1
        let qtdParaAumentar = document.getElementById("qtd"+valorBotao)
        qtdParaAumentar.innerHTML="#"+estruturas[valorBotao].qtd

        calcularSPS()
        
    }

}

//#endregion

//#region Comprar Upgrades

const upgradesList = { // preco,multiplicador,Objeto,IdBloco,novaFoto
    dedoDourado: [1000,0.5,"Dedo","blocoUpgradeDedoDourado","imagens/dedoMindingoDourado.png"], 
    botoFlamejante: [5000,1,"Boto","blocoUpgradeBotoFlamejante","imagens/boto de asa Queimado.png"],
    comprarBare: [25000,1,"Bebida","blocoUpgradeComprarBare",undefined]
}

//Mudando todos os valores de SPS
for (let string of estruturasString) {
    let SPSDisplayItem = document.getElementById("SPS"+string)
    SPSDisplayItem.innerHTML=ajusteSmagCoinsDisplay(estruturas[string].SPS) + " SPS"
}

function comprarUpgrade(botaoClicado) {

    let valorBotao = botaoClicado.value

    let upgradePreco = upgradesList[valorBotao][0]
    let upgradeMultiplicador = upgradesList[valorBotao][1]
    let upgradeEstrutura = upgradesList[valorBotao][2]
    let upgradeIdBloco = upgradesList[valorBotao][3]
    let novaImagem = upgradesList[valorBotao][4]
    

    if (smagCoins>=upgradePreco) {

        smagCoins-=upgradePreco

        estruturas[upgradeEstrutura].multiplicador+=upgradeMultiplicador

        let SPSUpgrade = document.getElementById("SPS"+upgradeEstrutura)
        SPSUpgrade.innerHTML=ajusteSmagCoinsDisplay(estruturas[upgradeEstrutura].SPS*estruturas[upgradeEstrutura].multiplicador) + " SPS"

        calcularSPS()

        if (novaImagem!=undefined) {
            let imagemTrocar = document.getElementById("imagem"+upgradeEstrutura)
            imagemTrocar.src = novaImagem
        }

        let blocoUpgrade = document.getElementById(upgradeIdBloco)
        blocoUpgrade.style.display="none"
    }

    

}



//#endregion

//#region RODAR JOGO

setInterval(rodarJogo,50)


function rodarJogo() {
    smagCoins+=roundToDecimal(SPS/20,2)
    smagCoinsDisplay.innerHTML=ajusteSmagCoinsDisplay(smagCoins)
}

//#endregion


