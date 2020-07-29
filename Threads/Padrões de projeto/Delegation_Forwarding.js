importScripts('Agentes de ação-reação/Agente.js');
// Eu utilizo hibridamente o padrão Delegation e o Forwarding
class Delegate{
    constructor(Actor_historia, acao, reacao, timeOfAllowance = 10000, levelUpCtx, TimeOfReply = 3000){
        this.agente = new agente(acao, reacao, timeOfAllowance, levelUpCtx, TimeOfReply);
        this.Actor  = Actor_historia;//Need a single source of truth
    }
    contarHistoria(){
        this.Actor.contarHistoria();
    }
    
    callAgent(){
        if(this.Actor.historia.length === 0)
            this.agente.callAgent();
        else setTimeout(()=>{
            this.callAgent()},1000);
    }
} 