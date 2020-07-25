importScripts('Agentes de ação-reação/Agente.js');

class Delegate{
    constructor(agente, Actor){
        this.agente = agente;//Agente
        this.Actor  = Actor;//Actor
    }
    contarHistoria(){
        this.Actor.contarHistoria();
    }
    
    callAgent(){
        if(this.Actor.historia.length === 0){
            console.log('Aqui');
            this.agente.callAgent();
        }
        else setTimeout(()=>{
            console.log(this.Actor.historia);
            this.callAgent()},1000);
    }
} 