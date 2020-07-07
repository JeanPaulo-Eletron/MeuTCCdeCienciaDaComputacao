var Bruto = []
var Refinado = ""
var Contexto = {
    Bruto,
    Refinado
}
onmessage = function(e) {
    Contexto.Refinado = ""; 
    console.log('Worker: Message received from main script');
    Contexto.Bruto = GetWords(e.data);
    console.log(Contexto.Bruto)
    setTimeout(()=>{
    const TextoSaida = Contexto.Refinado;
    Contexto.Refinado = ""; 
    const workerResult = 'Output: ' + TextoSaida;
    console.log('Worker: Posting message back to main script');
    postMessage(workerResult);        
    }, 1000)
    RefineContext();
    console.log(Contexto.Refinado)
}

function GetWords(frase){
    return [frase];
}

function RefineContext(){
    setInterval(()=>{
        Contexto.Bruto.forEach((item)=>{
          if (item == "Oi")
            Contexto.Refinado = "Oi tudo bem?"
        })
    }, 1)
}