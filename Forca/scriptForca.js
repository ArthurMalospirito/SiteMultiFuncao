
const botaoSelectTema = document.getElementById("selecaoTema")

//rever depois
window.onload = function() {
    escolheNovaPalavra(botaoSelectTema.value)
}

function mudouTema() {
    escolheNovaPalavra(botaoSelectTema.value)
}

const fundoEscuro = document.getElementById("telaEscuro")

function reiniciar() {
    escolheNovaPalavra(botaoSelectTema.value)
    perdeu=false
    fundoEscuro.style.display="none"
}


const palavrasComida = [
    "feijoada", "acarajé", "moqueca", "vatapá", "bobó de camarão", "farofa", "pamonha", "curau", "canjica", "tapioca",
    "bolo de fubá", "bolo de mandioca", "paçoca", "doce de leite", "rapadura", "brigadeiro", "beijinho", "cuscuz", "arroz carreteiro",
    "arroz com feijão", "arroz doce", "galo perdido", "vaca atolada", "frango com quiabo", "rabada", "dobradinha", "sarapatel",
    "buchada", "torresmo", "linguiça acebolada", "escondidinho", "macarrão", "lasanha de frango", "pastel de vento",
    "coxinha", "risoles", "empada", "quibe", "bolinho de chuva", "bolinho de arroz", "maniçoba", "caruru", "feijão tropeiro",
    "carne assada", "carne seca", "carne de panela", "linguiça de pernil", "frango a passarinho", "ovo frito", "ovo cozido", "sopa de óleo",
    "tutu de feijão", "angu", "sagu", "pudim de leite condensado", "mousse", "sorvete caseiro", "doce de mamão", "doce de abóbora",
    "queijo com goiabada", "maria mole", "pé de cabrito", "pé de moleque", "bananada", "goiabada", "cajuzinho", "canjica branca",
    "canjica amarela", "munguzá", "milho cremoso", "baião de dois", "churrasco", "churrasquinho", "espeto", "maionese",
    "salpicão", "vinagrete", "pipoca", "pipoca doce", "milho cozido", "salgadinho de pacote", "pão de queijo", "pão água e sal",
    "pão italiano", "pão francês", "pão artesanal", "requeijão", "manteiga", "queijo minas", "queijo coalho", "queijo prato",
    "mortadela", "presunto", "salame", "torresminho", "empadão", "quindim", "baba de moça", "cocada", "curau de milho", "milho assado"
  ];
  
const palavrasFrutas =[
    "maçã", "banana", "laranja", "abacaxi", "morango", "uva", "melancia", "melão", "kiwi", "mamão",
    "pêssego", "pera", "ameixa", "manga", "limão", "coco", "abacate", "maracujá", "cereja", "framboesa",
    "amora", "tangerina", "graviola", "açaí", "goiaba", "jabuticaba", "pitaya", "carambola", "figo", "lichia"
  ];

const palavrasAnimais = [
    "cachorro", "gato", "leão", "tigre", "elefante", "zebra", "girafa", "cavalo", "vaca", "porco",
    "ovelha", "macaco", "urso", "panda", "coelho", "raposa", "lobo", "camelo", "cervo", "anta",
    "jacaré", "crocodilo", "hipopótamo", "rinoceronte", "canguru", "lêmure", "tatu", "tamanduá", "lontra", "foca",
    "leopardo", "guepardo", "orangotango", "gorila", "bicho preguiça", "suricata", "papagaio", "arara", "coruja", "águia",
    "falcão", "pomba", "pato", "ganso", "cisne", "galinha", "galo", "pavão", "peru", "codorna",
    "tucano", "urubu", "avestruz", "emu", "quati", "texugo", "doninha", "esquilo", "rato", "camundongo",
    "hamster", "chinchila", "capivara", "jacaré anão", "gambá", "morcego", "bicho da seda", "joaninha", "abelha", "vespa",
    "formiga", "cigarra", "grilo", "borboleta", "mariposa", "libélula", "escorpião", "aranha", "caranguejo", "lagosta",
    "camarão", "polvo", "lula", "estrela do mar", "cavalo marinho", "peixe palhaço", "tubarão", "baleia", "golfinho", "peixe boi",
    "raia", "enguia", "salmão", "atum", "pinguim", "furão", "bicho geográfico", "corvo", "guaxinim", "urso pardo","boto"
  ];

let palavraEscolhida = ""

let palavraEscondida = ""

let erros = 0

let perdeu = false

const h1PalavraOculta = document.getElementById("palavraOculta")

function escolheNovaPalavra(tema) {

    const botoes = document.querySelectorAll(".botaoLetra")

    for (botao of botoes) {
        botao.style.backgroundColor = "rgba(207, 210, 215, 1)"
    }
    
    erros=0
    verificaErros(erros)

    palavraEscolhida=""

    palavraEscondida=""

    switch (tema) {

        case "comida":
            palavraEscolhida = palavrasComida[Math.floor(Math.random() * palavrasComida.length)];
        break;
        
        case "fruta":
            palavraEscolhida = palavrasFrutas[Math.floor(Math.random() * palavrasFrutas.length)];
        break;

        case "animal":
            palavraEscolhida = palavrasAnimais[Math.floor(Math.random() * palavrasAnimais.length)];
        break;

        default:
            alert("Tema fora de escopo")

    }

    for (caractere of palavraEscolhida) {

        if (caractere==" ") {
            palavraEscondida+="-"
        }
        else {
            palavraEscondida+="_"
        }
        palavraEscondida+=" "
    }

    h1PalavraOculta.innerHTML = palavraEscondida

}


function verificaLetra(letraChute) {
    let botaoChutado = document.getElementById(letraChute+"Button")

    let palavraEscondidaArray = palavraEscondida.split(" ")

    let letraVerifica =""

    let letraNaPalavra = false

    if (perdeu==false) {
        if (botaoChutado.style.backgroundColor!="red") {
            for (let i=0;i<palavraEscolhida.length;i++) {
                if (palavraEscolhida[i]==="á" || palavraEscolhida[i]==="ã" || palavraEscolhida[i]==="â") {
                    letraVerifica= "a"
                }
                else if (palavraEscolhida[i]==="ó" || palavraEscolhida[i]==="õ" || palavraEscolhida[i]==="ô") {
                    letraVerifica="o"
                }
                else if (palavraEscolhida[i]==="í" || palavraEscolhida[i]==="î") {
                    letraVerifica="i"
                }
                else if (palavraEscolhida[i]==="ú" || palavraEscolhida[i]==="û") {
                    letraVerifica="u"
                }
                else if (palavraEscolhida[i]==="ç") {
                    letraVerifica="c"
                }
                else {
                    letraVerifica=palavraEscolhida[i]
                }

                if (letraVerifica == letraChute) {
                    palavraEscondidaArray[i] = palavraEscolhida[i].toUpperCase()
                    letraNaPalavra=true
                }
            }
            palavraEscondida = palavraEscondidaArray.join(" ")
            h1PalavraOculta.innerHTML=palavraEscondida

            if (letraNaPalavra==true) {
                botaoChutado.style.backgroundColor = "green"
            }
            else {
                botaoChutado.style.backgroundColor = "red"
                erros+=1
                verificaErros(erros)
            }
        }
    }

    let splitTestePalavraFinal = palavraEscondida.split(" ")
    let testePalavraFinal = splitTestePalavraFinal.join("")

    let VerificaPalavraCertaTeste = palavraEscolhida.toUpperCase()
    let palavraCertateste = ""
    for (let caractere of VerificaPalavraCertaTeste) {
        if (caractere==" ") {
            palavraCertateste+="-"
        }
        else{
            palavraCertateste+=caractere
        }
    }

    if (testePalavraFinal==palavraCertateste) {
    
        
        fundoEscuro.style.display="flex"
        h2TelaFinal.innerHTML = "Você acertou!"
        h3TelaFinal.innerHTML = "A palavra era:"+" "+palavraEscolhida.toUpperCase()

    }

}



const h2TelaFinal = document.getElementById("fraseDerrotaVitoria")

const h3TelaFinal = document.getElementById("palavraRelevada")

function verificaErros(erros) {

    const forcaImagem = document.getElementById("forcaImagem")

    switch (erros) {

        case 0:
            forcaImagem.src = "imagensForca/forca0.png"
        break;

        case 1:
            forcaImagem.src = "imagensForca/forca1.png"
        break;

        case 2:
            forcaImagem.src = "imagensForca/forca2.png"
        break;

        case 3:
            forcaImagem.src = "imagensForca/forca3.png"
        break;

        case 4:
            forcaImagem.src = "imagensForca/forca4.png"
        break;

        case 5:
            forcaImagem.src = "imagensForca/forca5.png"
        break;

        case 6:
            forcaImagem.src = "imagensForca/forca6.png"
            perdeu=true
            fundoEscuro.style.display="flex"
            h2TelaFinal.innerHTML = "Você perdeu"
            h3TelaFinal.innerHTML = "A palavra era:"+" "+palavraEscolhida.toUpperCase()


        break;

        default:
            alert("Bugou os erros ein")

    }

}
