function GetWords(frase) {
    let vetor = frase.split(" ");
    for(let i = 0; i < vetor.length; i++)
        vetor[i] = vetor[i].toUpperCase();
    return vetor;
}

function isVogal(caracter) {
    switch (caracter) {
        case "a":
        case "A":
        case "e":
        case "E":
        case "i":
        case "I":  
        case "o":
        case "O":
        case "u":
        case "U": 
        return true
        break;
        default:
        return false
    }
}

function removerVogaisRepetidas(frase){
    let fraseFinal = [];
    let palavra = "";
    frase.forEach((item) => {
        for (let i = 0; i < item.length; i++){
            if( (item[i-1] !== item[i]) || ( ! isVogal(item[i]) ) ){
            palavra += item[i];
            }
        }    
        console.log("Palavra sem vogais repetidas:" + palavra);
        fraseFinal.push(palavra);
        palavra = "";
    })
    return fraseFinal;
}

function tratarCaracteresEspeciais(frase){
    let fraseTratada     = [];
    let palavra          = "";
    let caracterEspecial = "";
    frase.forEach((item)=>{
        for (let i = 0; i < item.length; i++){
            caracterEspecial = "";
            if( (item[i] !== '\n') && (item[i] !== ',') && (item[i] !== '.'))
                palavra += item[i]
                else 
            if (item[i] == ',')
                caracterEspecial = ","
                else
            if (item[i] == '.')
                caracterEspecial = "."
        }
        fraseTratada.push(palavra);
        if (caracterEspecial != "")
            fraseTratada.push(caracterEspecial);
        console.log("Caractere especial tratado: " + caracterEspecial);
        palavra = "";
    })
    return fraseTratada;
}