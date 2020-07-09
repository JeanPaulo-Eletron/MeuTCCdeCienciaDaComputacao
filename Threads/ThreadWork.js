var TextoSaida = "";
var Contexto = {
    Bruto: [ ],
    MemoriaDeTrabalho: [ ],
    Refinado: [ ],
    Residual: [ ],
    MemoriaLongoPrazo: [ ],
    BaseDeConhecimento: [ ]
};
function GetWords(frase) {
    let vetor = frase.split(" ");
    for(let i = 0; i < vetor.length; i++)
        vetor[i] = vetor[i].toUpperCase();
    return vetor;
}

function agenteOi() {
    let Tamanho       = Contexto.Bruto.length;
    let IndexVet      = Contexto.Bruto.indexOf("OI");
    if (IndexVet!==-1){
        console.log(Contexto.Bruto+','+Contexto.Bruto.indexOf("OI"));
        Contexto.Bruto.splice(IndexVet, 1);
        console.log(Contexto.Bruto);
        console.log(Tamanho+","+Contexto.Bruto.length);
        if (Tamanho != Contexto.Bruto.length){
            Contexto.Refinado.push("Oi tudo bem?");
            console.log('Disparador Ação-Reação acionado: "OI" ');
        }
    }
}

function RefineContext() {
    var myWorkerAgenteOi = new Worker('Agentes de ação-reação\Refinadores de contexto bruto\myWorkerAgenteOi.js');
    setInterval(()=>{
        agenteOi();    
    }, 1)
}
/* Disparador de esquecimento Contexto Bruto -> Memoria de Trabalho */
setInterval(()=>{
    console.log('Esquecendo...');
    console.log(Contexto.Bruto);
    Contexto.MemoriaDeTrabalho.concat(Contexto.Bruto);
    Contexto.Bruto.splice(0,Contexto.Bruto.length)
    console.log(Contexto.MemoriaDeTrabalho);
},10000)
/* Disparador de esquecimento Memoria de Trabalho -> Memoria de Longo Prazo */
setInterval(()=>{},30000)
/* INICIO */
onmessage = function(e) {
    Contexto.Refinado = []; 
    console.log('Worker: Message received from main script');
    Contexto.Bruto = Contexto.Bruto.concat(GetWords(e.data));
    console.log(Contexto.Bruto)
    setTimeout(()=>{
    Contexto.Refinado.forEach((item)=>{
        TextoSaida = item;
        Contexto.Refinado.splice(Contexto.Refinado.indexOf(item), 1);
    })
    if (TextoSaida == "")
        TextoSaida = "Desculpe não consegui te entender."
    const workerResult = 'Output: ' + TextoSaida;
    console.log('Worker: Posting message back to main script');
    postMessage(workerResult);  
    TextoSaida = "";
    }, 1000)
    RefineContext();
    console.log(Contexto.Refinado)
}

/*
Requisito:
° Adicionar o tempo em que aquela palavra foi acrescentada ao contexto bruto seja movida para a memoria de trabalho, removendo digamos 10% do tamanho do vetor do contexto bruto(min 1 elemento).
° Adicionar o tempo em que a memoria de trabalho é movida para memória de longo prazo.
° Adicionar um agente para que quando aquela palavra ficar antiga no contexto bruto sem ser processada ele dê um splice nela.. *1
° Adicionar informação residual após remover um item do refinado, deverá haver uma agente de gatilho(sempre que um item for removido do contexto refinado, antes dele ser removido ele será acionado e decidira o que irá para o residual, porém da mesma forma que o contexto bruto, ele tera marcado o tempo que ele foi colocado lá. 
° Adicionar um agente que remove um item da informação residual depois de um certo tempo. *1
° Sempre que remover algo do contexto bruto, contexto refinado e residual, se ele não tiver sido adicionado ainda, adicionar a memoria de longo prazo, se já tiver sido adicionada adicionar essa informação que ela foi usada mais vezes. *2
° Adicionar limite de tamanho para a base de conhecimento, sempre que chegar naquele limite diminuir o tamanho do vetor em 10%.
  ° Elaborar forma de remover os 10% menos relevantes (menos reforçados, quanto mais antiga as citações a aquela informação e menor a quantidade daquela citação mais elegivel a descarte estara)
° O objetivo da base de conhecimento é conectar lógicamente dados em comum, simulando o conhecimento estruturado.
*1 - Simula memória de curto prazo.
*2 - Simula memória de longo prazo.
*/