let verba = 500

const verbaText = document.getElementById("verba")

window.onload = function() {
    selecionarJogo(document.getElementById("selectMines"));
}

function roundToDecimal(value,decimals) {
    let fator = Math.pow(10,decimals);
    return Math.round(value*fator) /fator;
}

//Mudar botão
let jogoSelecionado = "mines";

const tituloJogo = document.getElementById("tituloJogo")

const sectionMines = document.getElementById("minesGameId")
const sectionCrash = document.getElementById("crashGameId")
const sectionDouble = document.getElementById("doubleGameId")

function selecionarJogo(botaoClicado) {
    
    const corBotaoPadrao = "rgba(255, 32, 64, 1)"; //rgba(197, 200, 205, 1) //rgba(255, 32, 64, 1)"
    const corBotaoSelecionado = "rgba(255, 80, 110, 1)"; //rgba(97, 100, 105, 1) //rgba(147, 150, 155, 1);
    let botaoMines = document.getElementById("selectMines");
    let botaoCrash = document.getElementById("selectCrash");
    let botaoDouble = document.getElementById("selectDouble");

    jogoSelecionado=botaoClicado.value

    switch (jogoSelecionado) {
        case "mines":
            botaoMines.style.backgroundColor=corBotaoSelecionado;
            botaoCrash.style.backgroundColor=corBotaoPadrao;
            botaoDouble.style.backgroundColor=corBotaoPadrao;

            tituloJogo.innerHTML="Mines"

            sectionMines.style.display="flex"
            sectionCrash.style.display="none"
            sectionDouble.style.display="none"
        break;
        case "crash":
            botaoMines.style.backgroundColor=corBotaoPadrao;
            botaoCrash.style.backgroundColor=corBotaoSelecionado;
            botaoDouble.style.backgroundColor=corBotaoPadrao;

            tituloJogo.innerHTML="Crash"

            sectionMines.style.display="none"
            sectionCrash.style.display="flex"
            sectionDouble.style.display="none"
        break;
        case "double":
            botaoMines.style.backgroundColor=corBotaoPadrao;
            botaoCrash.style.backgroundColor=corBotaoPadrao;
            botaoDouble.style.backgroundColor=corBotaoSelecionado;

            tituloJogo.innerHTML="Double"

            sectionMines.style.display="none"
            sectionCrash.style.display="none"
            sectionDouble.style.display="flex"
        break;
        default:
            alert("Deu Ruim");
    }
    
}

let botoesMinas = []

for (i=1;i<=25;i++){
    let mina = "mina"+i;

    botoesMinas.push(document.getElementById(mina));

}

// Item aleatório // let itemAleatorio = lista[Math.floor(Math.random() *lista.lenght)];

const selectQtdMinas = document.getElementById("qtdMines");

let botoesComMinas =[];

let qtdMinas = 0;

//VER ISSO!

let comecouJogo = false;

let botoesEscolhidosValue = [];

let minasClicadas=[];

const proxMultiplicadorText = document.getElementById("proxMultiplicador");
const multiplicadorText = document.getElementById("multiplicador");
const botaoInteracao = document.getElementById("botaoInteracao");
const valorApostadoInput = document.getElementById("valorApostado");

const telaFinal = document.getElementById("telaFinalId");
const textoFinal = document.getElementById("textoFinal");

let lucro = valorApostadoInput.value;

function resetarMinas() {

    botoesEscolhidosValue = []

    minasClicadas=[]
    //resetanado cor dos botões
    for (botao of botoesMinas) {
        botao.style.backgroundColor="rgba(32, 35, 40, 1)";
    }

    gemasReveladas=0
    //resetando ícones
    const imagensBomba = document.querySelectorAll(".imagemBomba");
    for (bomba of imagensBomba) {
        bomba.style.display="none";
    }
    const imagensDiamante = document.querySelectorAll(".imagemDiamante");
    for (diamante of imagensDiamante) {
        diamante.style.display="none";
    }

    multiplicadorText.value = 1;
    proxMultiplicadorText.value=1;

    qtdMinas=selectQtdMinas.value;

}

function comecarJogo() {
    if (comecouJogo===false){
        if (valorApostadoInput.value>0 && valorApostadoInput.value<=verba) {
            
            resetarMinas();
            
            let botaoAleatorio = undefined;
            let verifyRepetirBotao = false;
            
            for (i=0;i<qtdMinas;i++) {
                verifyRepetirBotao=false;
                botaoAleatorio = botoesMinas[Math.floor(Math.random()*botoesMinas.length)];

                while (verifyRepetirBotao===false) {
                    if (botoesEscolhidosValue.includes(botaoAleatorio.value)) {
                        botaoAleatorio = botoesMinas[Math.floor(Math.random()*botoesMinas.length)];
                    }
                    else {
                        verifyRepetirBotao=true;
                    }            
                    
                }
                botoesEscolhidosValue.push(botaoAleatorio.value);
            }
            multiplicadorText.value=1;
            proxMultiplicador = 0.99/((25-qtdMinas-gemasReveladas)/25);
            proxMultiplicadorText.value=roundToDecimal(proxMultiplicador,2);
            
            lucro = valorApostadoInput.value;
            botaoInteracao.innerHTML="Retirar R$ "+roundToDecimal(lucro,2);

            verba-=roundToDecimal(lucro,2)
            verbaText.innerHTML=roundToDecimal(verba,2)
            tocarAudioDiamante()
            comecouJogo=true;
        }
        else {
            if (verba==0){
                alert("Faliu né? Falei para nn apostar")
            }
            else {
                if (valorApostadoInput.value<=0){
                    alert("Aposte Algo");
                }
                else {
                    alert("Digite um valor que possa pagar!")
                }
            }
        }
    }
    else {
        //CONDIÇÃO VITÓRIA
        comecouJogo=false;
        
        TocarAudioLevelUp()
        resetarMinas()
        botaoInteracao.innerHTML="Começar Jogo";

        //Colocar "LUCROU TANTO!!!"
        telaFinal.style.display="flex"
        textoFinal.innerHTML="Você lucrou R$ "+roundToDecimal(lucro,2)+"!";
        verba+=roundToDecimal(lucro,2)
        verbaText.innerHTML=roundToDecimal(verba,2)

    }
}

function jogarNovamente() {

    resetarMinas()
    telaFinal.style.display="none";

}

let gemasReveladas =0;

let multiplicador = 1;

let proxMultiplicador = 1;



function clicouMina(botaoClicado) {
    qtdMinas=selectQtdMinas.value;
    if (comecouJogo===true) {
        if (!minasClicadas.includes(botaoClicado.value)) {
            minasClicadas.push(botaoClicado.value);

            if (botoesEscolhidosValue.includes(botaoClicado.value)) {
                let bombaId = "mina"+botaoClicado.value+"imgBomba";
                document.getElementById(bombaId).style.display="flex";
                botaoClicado.style.backgroundColor="red";
                tocarAudioBomba()
                perder()
                //COLOCAR "PERDEU TANTO!!!"
            }
            else {
                let diamanteId = "mina"+botaoClicado.value+"imgDiamante";
                document.getElementById(diamanteId).style.display="flex";
                botaoClicado.style.backgroundColor="lightblue";

                multiplicador = proxMultiplicador;
                multiplicadorText.value = roundToDecimal(proxMultiplicador,2);

                gemasReveladas+=1;
                proxMultiplicador = 0.99/((25-qtdMinas-gemasReveladas)/25);
                proxMultiplicadorText.value=roundToDecimal(proxMultiplicador,2);

                lucro = valorApostadoInput.value*roundToDecimal(multiplicador,2);

                botaoInteracao.innerHTML="Retirar R$ "+roundToDecimal(lucro,2);
                tocarAudioDiamante()
            }
        }

        
    }
}

function perder() {
    comecouJogo=false;
    telaFinal.style.display="flex"
    textoFinal.innerHTML="Você Perdeu!";
    botaoInteracao.innerHTML="Começar Jogo";
    
}


const audioDiamante = document.getElementById("audioDiamante");
const audioBomba = document.getElementById("audioBomba");
const audioLevelUp = document.getElementById("audioLevelUp")

function tocarAudioDiamante() {

    audioDiamante.pause();
    audioDiamante.currentTime=0;
    audioDiamante.play();

}

function tocarAudioBomba() {

    audioBomba.pause();
    audioBomba.currentTime=0;
    audioBomba.volume=0.6
    audioBomba.play();
    

}

function TocarAudioLevelUp() {

    audioLevelUp.pause();
    audioLevelUp.currentTime=0;
    audioLevelUp.volume=0.1;
    audioLevelUp.playbackRate=1.25
    audioLevelUp.play();
    

}
