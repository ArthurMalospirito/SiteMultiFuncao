var tipoCriptografia = "";

var opcaoCriptografar = false

//textoOutput
const textoOutput = document.getElementById("outputTexto");
//textoInput
const textoInput = document.getElementById("inputTexto");


//#region Funções Botões

function mudouCriptografia() {
    const select = document.getElementById("selectCriptografia");

    const inputH3 = document.getElementById("inputH3")

    const outputH3 = document.getElementById("outputH3")

    const indice = document.getElementById("indice");

    textoInput.value=""
    textoOutput.innerHTML=""

    switch (select.value){

        case "binario":
            tipoCriptografia=select.value; //Fala o tipo da criptografia
            indice.style.display = "none"; //Fala para o indice sumir, caso não precisar
            inputH3.innerHTML="Binário";    //muda o texto do input para o que irá entrar
            outputH3.innerHTML="ASCII"; //muda o texto do output para o que irá sair
            opcaoCriptografar = false;  //fala o inicio, se vai criptografar ou não
            break;
        case "hexadecimal":
            tipoCriptografia=select.value;
            indice.style.display = "none";
            inputH3.innerHTML="Hexadecimal";
            outputH3.innerHTML="ASCII";
            opcaoCriptografar = false;
            break;
        case "octal":
            tipoCriptografia=select.value;
            indice.style.display = "none";
            inputH3.innerHTML="Octal";
            outputH3.innerHTML="ASCII";
            opcaoCriptografar = false;
            break;
        case "cifraCesar":
            tipoCriptografia=select.value;
            indice.style.display ="block";
            inputH3.innerHTML="Texto normal";
            outputH3.innerHTML="Texto Criptografado";
            opcaoCriptografar = true;
            break;
        default:
            alert("Deu merda ein");
    }
}

let valorChave = 0;

function mudouChaveCifraCesar() {
    const indice = document.getElementById("chaveCifra");

    valorChave = Number(indice.value);
}

function trocaInput() {
    
    let outputTroca = outputH3.innerHTML;
    let inputTroca = inputH3.innerHTML;

    outputH3.innerHTML = inputTroca;
    inputH3.innerHTML = outputTroca;
    opcaoCriptografar= !opcaoCriptografar

    inputTroca = textoInput.value
    outputTroca = textoOutput.value

    textoInput.value = outputTroca
    textoOutput.value = inputTroca

}

function limparBlocos() {
    textoInput.value = ""
    textoOutput.value = ""
}

//Quando apertar botão criptografar
function criptografar () {
    
    //Variável de algarismos
    const algarismos = ["0","1","2","3","4","5","6","7","8","9"];

    //Variável de letras
    const letrasHex = ["a","b","c","d","e","f","A","B","C","D","E","F"];

    //textoOutput
    const textoOutput = document.getElementById("outputTexto");

    //textoInput
    const textoInput = document.getElementById("inputTexto");

    let userInput = textoInput.value;

    let inputPolido = "";

    let output = "";
    //Ele vê se deve polir o texto ou não
    if (tipoCriptografia=="binario" || tipoCriptografia=="hexadecimal" || tipoCriptografia=="octal")
    {

        if (opcaoCriptografar==false) {
            //polimento do input
            for (let caractere of userInput) {
                if (algarismos.includes(caractere)) {
                    inputPolido+=caractere;
                }
                else if (letrasHex.includes(caractere)){
                    let letraCerta = caractere.toLowerCase();
                    inputPolido+=letraCerta;
                }
            }

        }
        else {
            inputPolido = userInput

        }

    }
    else if (tipoCriptografia=="cifraCesar"){
        console.log("aveee")
        inputPolido = userInput.toLowerCase()
    }
    else {
        inputPolido = userInput
    }

    switch (tipoCriptografia) {

        case "binario":
            
            if (opcaoCriptografar==true){
                output = asciiToBinario(inputPolido);
            }
            else if (inputPolido.length%8==0){
                    
                output = binarioToAscii(inputPolido);
            }
            else{output="Talvez isso não seja binário, digite novamente"}
           

        break;

        case "hexadecimal": 

            if (opcaoCriptografar==true){
                output = asciiToHexadecimal(inputPolido);
            }
            else if (inputPolido.length%2==0){
                    
                output = hexadecimalToAscii(inputPolido)
            }
            else{output="Talvez isso não seja Hexadecimal, digite novamente"}

        break;

        case "octal":

            if (opcaoCriptografar==true){
                output = asciiTooctal(inputPolido);
            }
            else if (inputPolido.length%3==0){
                    
                output = octalToAscii(inputPolido);
            }
            else{output="Talvez isso não seja octal, digite novamente"}

        break;

        case "cifraCesar":
            if (valorChave!=undefined){
                if (opcaoCriptografar==true){
                    output = cifraDeCesar(inputPolido,valorChave);
                }
                else { 
                    output = deCifraDeCesar(inputPolido,valorChave);
                }
            }
            else {
                output = "Escolha uma Chave"
            }
        break;
        default:
            alert("Escolha uma criptografia");
            output="Escolha uma criptografia";

    }

    textoOutput.value = output;

}
//#endregion


//#region Funções de conversão 
//recebe o valor em ascii e converte para binário
function asciiToBinario(valorAscii) {

    let fraseFinal =""

    for (let letra of valorAscii){
        let letraValorDecimal = letra.charCodeAt(0)

        let valorBinario = letraValorDecimal.toString(2).padStart(8, "0");
        fraseFinal+=valorBinario

    }
    return fraseFinal

}

//recebe o valor em ascii e converte para hexadecimal
function asciiToHexadecimal(valorAscii) {

    let fraseFinal =""
    for (let letra of valorAscii){
        let letraValorHexa = letra.charCodeAt(0)

        let valorHexa = letraValorHexa.toString(16).toLowerCase().padStart(2, "0");
        fraseFinal+=valorHexa

    }
    return fraseFinal

}

//recebe o valor em ascii e converte para octal
function asciiTooctal(valorAscii) {

    let fraseFinal =""
    for (let letra of valorAscii){
        let letraValorOcto = letra.charCodeAt(0)

        let valorOcto = letraValorOcto.toString(8).padStart(3, "0");
        fraseFinal+=valorOcto

    }
    return fraseFinal

}

//Recebe valor em binário e devolve o texto já convertido para Ascii
function binarioToAscii(valorBinario){

    let valorBytes = [];

    let byteAtual = [];

    for (let bitGeral of valorBinario){
        byteAtual.push(bitGeral);
        if (byteAtual.length>=8) {
            let valorByte=0;
            valorByte=0;
            let expBit = 7;
            expBit = 7;
            for (let bit of byteAtual) {
                if (bit=="1") {
                    valorByte+=(2**expBit);
                    
                }
                expBit-=1;
            }
            valorBytes.push(valorByte);
            byteAtual=[];
        }


        
    }
    //transoformar em valores numéricos
    let fraseFinal = "";
    for (byte of valorBytes) {
        fraseFinal+=String.fromCharCode(byte);
    }
    return fraseFinal;
    
}

//recebe o valor em hexadecimal e converte para ascii
function hexadecimalToAscii(valorHexadecimal) {

    let valorBytes = [];

    let byteAtual = "";

    for (let bitGeral of valorHexadecimal){
        byteAtual+=bitGeral
        if (byteAtual.length>=2) {
            
            valorByteAtual = parseInt(byteAtual, 16);

            valorBytes.push(valorByteAtual);
            byteAtual=[];
        }


        
    }
    //transoformar em valores numéricos
    let fraseFinal = "";
    for (byte of valorBytes) {
        fraseFinal+=String.fromCharCode(byte);
    }
    return fraseFinal;

}

//recebe o valor em octal e converte para ascii
function octalToAscii(valoroctal) {

    
    let valorBytes = [];

    let byteAtual = "";

    for (let bitGeral of valoroctal){
        byteAtual+=bitGeral
        if (byteAtual.length>=3) {
            
            valorByteAtual = parseInt(byteAtual, 8);

            valorBytes.push(valorByteAtual);
            byteAtual=[];
        }


        
    }
    //transoformar em valores numéricos
    let fraseFinal = "";
    for (byte of valorBytes) {
        fraseFinal+=String.fromCharCode(byte);
    }
    return fraseFinal;

}
//constante com as letras do alfabeto
const letrasAlfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

//Transformador de texto para cifra de cesar
function cifraDeCesar(textoNormal,chave) {

    let fraseEncriptada =""

    let letraEncriptada =""

    for (letra of textoNormal) {

        if (letra===" "){
            fraseEncriptada+=" "
        }
        else {
            let posicaoAtual = letrasAlfabeto.indexOf(letra)
            let novaPosicao = (posicaoAtual+chave) %26
            letraEncriptada = letrasAlfabeto[novaPosicao]
            fraseEncriptada+=letraEncriptada

        }

    }
    return fraseEncriptada

}

//Pega cifra de cesar e transforma para texto
function deCifraDeCesar(textoCriptografado,chave) {


    let fraseEncriptada =""

    let letraEncriptada =""

    let novaPosicao

    for (letra of textoCriptografado) {

        if (letra===" "){
            fraseEncriptada+=" "
        }
        else {
            let posicaoAtual = letrasAlfabeto.indexOf(letra)
            if (posicaoAtual-chave<0){
                novaPosicao=(posicaoAtual+26)-chave
            }
            else{
                novaPosicao = posicaoAtual-chave
            }
            letraEncriptada = letrasAlfabeto[novaPosicao]
            fraseEncriptada+=letraEncriptada

        }

    }
    return fraseEncriptada


}

//#endregion