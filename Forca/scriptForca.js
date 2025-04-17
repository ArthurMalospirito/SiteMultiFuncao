
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


const palavrasComida = ["lasanha","feijoada","strogonoff","arroz","carne","batata","galinhada","cachorro quente","empada","coxinha","bolo","ovo","feijão","pizza","churrasco","miojo","linguiça"]

const palavrasFrutas =["maça","banana","laranja","uva","ameixa","pitaya","kiwi","melância","mamão","limão","abacate","maracujá","jabuticaba"]

const palavrasAnimais = [
    "Cachorro", "Gato", "Leão", "Tigre", "Elefante", "Zebra", "Girafa", "Cavalo", "Vaca", "Porco",
    "Ovelha", "Macaco", "Urso", "Panda", "Coelho", "Raposa", "Lobo", "Camelo", "Cervo", "Anta",
    "Jacaré", "Crocodilo", "Hipopótamo", "Rinoceronte", "Canguru", "Lêmure", "Tatu", "Tamanduá", "Lontra", "Foca",
    "Leopardo", "Guepardo", "Orangotango", "Gorila", "Bicho preguiça", "Suricata", "Papagaio", "Arara", "Coruja", "Águia",
    "Falcão", "Pomba", "Pato", "Ganso", "Cisne", "Galinha", "Galo", "Pavão", "Peru", "Codorna",
    "Tucano", "Urubu", "Avestruz", "Emu", "Quati", "Texugo", "Doninha", "Esquilo", "Rato", "Camundongo",
    "Hamster", "Chinchila", "Capivara", "Jacaré anão", "Gambá", "Morcego", "Bicho da seda", "Joaninha", "Abelha", "Vespa",
    "Formiga", "Cigarra", "Grilo", "Borboleta", "Mariposa", "Libélula", "Escorpião", "Aranha", "Caranguejo", "Lagosta",
    "Camarão", "Polvo", "Lula", "Estrela do mar", "Cavalo marinho", "Peixe palhaço", "Tubarão", "Baleia", "Golfinho", "Peixe boi",
    "Raia", "Enguia", "Salmão", "Atum", "Pinguim", "Furão", "Bicho geográfico", "Corvo", "Guaxinim", "Urso pardo"
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
