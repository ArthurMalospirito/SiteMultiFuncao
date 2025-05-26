// 1 - TRANFORMAR ESTRUTURAS EM OBJETOS, CARA COISA UM OBJETO

// 2 - Fazer um negócio para mostrar os números bonito, ao milhão = 1.803M/1.115B/1.250T



//#region Variáveis Globais

const smagCoinsDisplay = document.getElementById("smagCoins")
let smagCoins=0

const SPSDisplay = document.getElementById("SPS")
let SPS=0


class Estrutura {

    constructor(preco,qtd,SPS,multiplicador) {

        this.preco = preco
        this.qtd = qtd
        this.SPS = SPS
        this.multiplicador = multiplicador

    }

}

const dedo = new Estrutura(25,0,1,1)
const boto = new Estrutura(250,0,10,1)
const bebida = new Estrutura(2500,0,50,1)

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

    SPS = spsCalculo
    SPSDisplay.innerHTML=SPS

}

function roundToDecimal(value,decimals) {
    let fator = Math.pow(10,decimals);
    return Math.round(value*fator) /fator;
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

    smagCoins+=1
    smagCoinsDisplay.innerHTML=roundToDecimal(smagCoins,2)

}

function soltouClick() {

    imgBotaoClicker.style.width=proporcaoImgClickerTexto

}

//#endregion

//#region Comprar Itens


const btnComprarDedo=document.getElementById("comprarDedo")
btnComprarDedo.innerHTML="S$ "+dedo.preco

const btnComprarBoto=document.getElementById("comprarBoto")
btnComprarBoto.innerHTML="S$ "+boto.preco

const btnComprarBebida=document.getElementById("comprarBebida")
btnComprarBebida.innerHTML="S$ "+bebida.preco

let multiplicadorPreco=1.1

function comprarItem(botaoClicado) {

    let valorBotao=botaoClicado.value

    if (smagCoins>=estruturas[valorBotao].preco) {
        smagCoins-=estruturas[valorBotao].preco
        smagCoinsDisplay.innerHTML=roundToDecimal(smagCoins,2)
        estruturas[valorBotao].preco=roundToDecimal(estruturas[valorBotao].preco*1.1,0)
        botaoClicado.innerHTML="S$ "+estruturas[valorBotao].preco

        estruturas[valorBotao].qtd+=1
        let qtdParaAumentar = document.getElementById("qtd"+valorBotao)
        qtdParaAumentar.innerHTML="#"+estruturas[valorBotao].qtd

        calcularSPS()
        
    }

}

//#endregion

//#region Comprar Upgrades

const upgradesList = {
    dedoDourado: [1000,0.5,"Dedo","blocoUpgradeDedoDourado"], // 0 = preco, 1 = mult, 2 = Objeto,3=idBloco
    botoFlamejante: [5000,1,"Boto","blocoUpgradeBotoFlamejante"]
}



function comprarUpgrade(botaoClicado) {

    let valorBotao = botaoClicado.value

    let upgradePreco = upgradesList[valorBotao][0]
    let upgradeMultiplicador = upgradesList[valorBotao][1]
    let upgradeEstrutura = upgradesList[valorBotao][2]
    let upgradeIdBloco = upgradesList[valorBotao][3]
    

    if (smagCoins>=upgradePreco) {

        smagCoins-=upgradePreco

        estruturas[upgradeEstrutura].multiplicador+=upgradeMultiplicador

        let SPSUpgrade = document.getElementById("SPS"+upgradeEstrutura)
        SPSUpgrade.innerHTML=estruturas[upgradeEstrutura].SPS*estruturas[upgradeEstrutura].multiplicador + " SPS"

        calcularSPS()

        

        let blocoUpgrade = document.getElementById(upgradeIdBloco)
        blocoUpgrade.style.display="none"
    }

    

}



//#endregion

//#region RODAR JOGO

setInterval(rodarJogo,50)


function rodarJogo() {
    smagCoins+=roundToDecimal(SPS/20,2)
    smagCoinsDisplay.innerHTML=roundToDecimal(smagCoins,2)
}

//#endregion


