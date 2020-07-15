var ativo
var TextoSaida = "";
var Contexto = {
    Foco: [ ],
    MemoriaDeTrabalho: [ ],
    Compreensao: [ ],
    Residual: [ ],
    MemoriaLongoPrazo: [ ],
    BaseDeConhecimento: [ ],
    Nivel1: [ ],
    Nivel2: [ ],
    Temas: ["Big Bang", "Formação da terra"],
    Tema: "Big Bang"
};
var Agente = {
    Acao: ["OI", "TUDO"],
    Reacao: ["Oi tudo bem?", "Tudo o que?"],
    Nivel1: ["", "Oi tudo bem?"]
}
// Agente de nível 1
function agenteBem(){
    let Tamanho       = Contexto.Nivel1.length;
    let IndexVet1      = Contexto.Nivel1.indexOf("TUDO");
    if (IndexVet1!==-1){
        let IndexVet2     = Contexto.Foco.indexOf("BEM?");
        if (IndexVet2!==-1){
            Contexto.Nivel1.splice(IndexVet1, 1);
            Contexto.Foco.splice(IndexVet2, 1);
            if (Tamanho != Contexto.Nivel1.length){
                Contexto.Compreensao.splice(Contexto.Compreensao.indexOf("Tudo o que?"),1)
                Contexto.Compreensao.splice(Contexto.Compreensao.indexOf("Oi tudo bem?"),1)
                Contexto.Compreensao.push("Tô bem sim companheiro.");
                console.log('Disparador Ação-Reação acionado: "TUDO BEM?" ');
                Contexto.Nivel2 = Contexto.Nivel2.concat("TUDO","BEM?");
            }       
        } 
    }
}

function callAgents(){
    Agente.Acao.forEach((item, index)=>{
        console.log(item);
        console.log("idx: "+index);
        let Tamanho       = Contexto.Foco.length;
        let IndexVet      = Contexto.Foco.indexOf(item);
        if (IndexVet!==-1){
            Contexto.Foco.splice(IndexVet, 1);
            if (Tamanho != Contexto.Foco.length){
                Contexto.Compreensao.push(Agente.Reacao[index]);
                console.log('Disparador Ação-Reação acionado: "'+item+'" ');
                Contexto.Nivel1 = Contexto.Nivel1.concat(item);
            }       
        }
        if (item == "TUDO")
            agenteBem();//Se a pessoa falou, "Tudo" e deu enter "Bem", ele não entrará no if.
    })    
}