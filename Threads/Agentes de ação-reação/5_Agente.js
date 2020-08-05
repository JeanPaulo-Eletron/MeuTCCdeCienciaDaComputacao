importScripts('Padrões de projeto/6_Observer.js');
var ativo;
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
var timeIDReply;
var TimeOfReply;
var neglectSetTimeout;
var oblivionSetTimeout;
var compreensaoASeremEliminadas = [ ]; 

var observerContinuacaoHistoria = new Observable();
const ObserverCheckPriority = new Observable();

ObserverCheckPriority.subscribe((data)=>{
        if(data.word === 'OR')
            data.callback(data.word);
    });

class agente{
    constructor(acao, reacao, timeOfAllowance = 10000, levelUpCtx, TimeOfReply = 3000){
        this.acao            = acao;
        this.reacao          = reacao;
        this.levelUpCtx      = levelUpCtx;
        this.attend          = this.comply;
        this.timeOfAllowance = timeOfAllowance; 
        this.TimeOfReply     = TimeOfReply;
        this.refused         = false;
    }
    neglect(){
        /* Disparador de esquecimento Contexto Foco -> Memoria de Trabalho */
        if (! (neglectSetTimeout === undefined))
            clearTimeout(neglectSetTimeout);
        neglectSetTimeout = setTimeout(()=>{
            console.log('Esquecendo o que está no contexto Foco...');
            console.log("O que estava no contexto Foco: " + Contexto.Foco);
            Contexto.MemoriaDeTrabalho = Contexto.MemoriaDeTrabalho.concat(Contexto.Foco);
            Contexto.Foco.splice(0,Contexto.Foco.length)
            console.log("O que esta na memoria de trabalho agora:" + Contexto.MemoriaDeTrabalho);
            Contexto.MemoriaDeTrabalho.forEach(
                (item)=>{
                    let callback = (item)=>{
                            console.log('CallBack Alarm For Priority Chamado! :: ' + item + ' ::');
                            Contexto.MemoriaDeTrabalho.splice(Contexto.MemoriaDeTrabalho.indexOf(item),1);
                            Contexto.MemoriaLongoPrazo.splice(Contexto.MemoriaLongoPrazo.indexOf(item),1);
                            Contexto.Foco.push(item);
                        };
                    let data = {
                            word: item,
                            callback: callback
                        };
                    // meditation time
                    setTimeout(()=>{ObserverCheckPriority.notify(data);}, 1000);
                }
            )
            this.oblivion();
        },10000)
    }
    oblivion(){
        /* Disparador de esquecimento Memoria de Trabalho -> Memoria de Longo Prazo */
        if (! ( oblivionSetTimeout === undefined))
            clearTimeout(oblivionSetTimeout);
       oblivionSetTimeout = setTimeout(()=>{
            console.log('Esquecendo o que está na memória de trabalho...');
            console.log("O que estava na memoria de trabalho: " + Contexto.MemoriaDeTrabalho);
            Contexto.MemoriaLongoPrazo = Contexto.MemoriaLongoPrazo.concat(Contexto.MemoriaDeTrabalho);
            Contexto.MemoriaDeTrabalho.splice(0,Contexto.MemoriaDeTrabalho.length)
            console.log("O que esta na memoria de longo prazo agora:" + Contexto.MemoriaLongoPrazo);
        },30000);    
    }
    callAgent(){
        this.neglect();
        this.attend(this.acao, this.reacao, this.levelUpCtx, this.TimeOfReply);
    }
    
    yellReply(_TimeOfReply){
        TimeOfReply = _TimeOfReply;
        if (! (timeIDReply === undefined))
            clearInterval(timeIDReply)
        timeIDReply = setInterval(()=>{
            console.log("Compreensão: "+Contexto.Compreensao);
            TextoSaida = "";    
            Contexto.Compreensao.forEach((item)=>{
                console.log("Compreensão(item a item): " + item);
                TextoSaida = TextoSaida + item + " ";
                compreensaoASeremEliminadas.push(item);
            });
            console.log("compreensao a serem eliminadas: " + compreensaoASeremEliminadas);
            compreensaoASeremEliminadas.forEach((item)=>{Contexto.Compreensao.splice(Contexto.Compreensao.indexOf(item), 1);}) 
            TextoSaida  = TextoSaida.substring(0, TextoSaida.length-1);
            if (TextoSaida !== ""){
                const workerResult = '\nNarrador: ' + TextoSaida;
                console.log('Worker: Posting message back to main script');
                postMessage(workerResult);  
                TextoSaida = "";
                ativo = false;
                Contexto.Residual = Contexto.Residual.concat(Contexto.Compreensao);
                Contexto.Compreensao = [];
                compreensaoASeremEliminadas = [ ];
                clearInterval(timeIDReply);
            };
        }, TimeOfReply)
    }
    
    comply(acao, reacao, levelUpCtx, TimeOfReply){
        console.log(acao);
        let Tamanho       = Contexto.Foco.length;
        let IndexVet      = Contexto.Foco.indexOf(acao);
        if (IndexVet!==-1){
            Contexto.Foco.splice(IndexVet, 1);
            Contexto.Compreensao.push(reacao);
            console.log('Disparador Ação-Reação acionado: "'+acao+'" ');
            Contexto.Nivel1 = Contexto.Nivel1.concat(acao);
        }
        if (! (levelUpCtx === undefined) )
            levelUpCtx();
        this.attend = this.refuse;
        if (! (this.timeOfWit === undefined) )
            clearInterval(this.timeOfWit)
        this.timeOfWit = setTimeout(()=>{
            this.attend  = this.comply
            this.refused = false
        }, this.timeOfAllowance)
        this.yellReply(TimeOfReply);
    }
    
    refuse(acao, reacao, levelUpCtx){
        if (! (this.refused))
            this.comply(acao, 'Você está repetitivo...\n', levelUpCtx, 5000);   
        this.refused = true;
    }
}

class agenteLevel1{
    constructor(acaoFoco, reacao, acaoNivel1, DesfazerReacao, DesfazerReacao2, levelUpCtx){
        this.acaoFoco       = acaoFoco;
        this.reacao         = reacao;
        this.acaoNivel1     = acaoNivel1;
        this.DesfazerReacao = DesfazerReacao;
        this.DesfazerReacao2 = DesfazerReacao2;
        this.levelUpCtx     = levelUpCtx;
    }
    callAgent(){
        let Tamanho       = Contexto.Nivel1.length;
        let IndexVet1      = Contexto.Nivel1.indexOf(this.acaoFoco);
        if (IndexVet1!==-1){
            let IndexVet2     = Contexto.Foco.indexOf(this.acaoNivel1);
            if (IndexVet2!==-1){
                Contexto.Nivel1.splice(IndexVet1, 1);
                Contexto.Foco.splice(IndexVet2, 1);
                Contexto.Compreensao.splice(Contexto.Compreensao.indexOf(this.DesfazerReacao),1)
                Contexto.Compreensao.splice(Contexto.Compreensao.indexOf(this.DesfazerReacao2),1)
                Contexto.Compreensao.push(this.reacao+"\n");
                console.log('Disparador Ação-Reação acionado: "'+this.acaoFoco + this.acaoNivel1 +'" ');
                Contexto.Nivel2 = Contexto.Nivel2.concat(this.acaoFoco,this.acaoNivel1);      
            } 
        }
        if (! (this.levelUpCtx === undefined) )
            this.levelUpCtx();
    }
}

class Actor{
    constructor(historia, observerContinuacaoHistoria){
        this.historia = historia.split(" ");
        this.observerContinuacaoHistoria = observerContinuacaoHistoria;
    }    
    contarHistoria(){
        if(this.historia.lenght !== 0){
            var idIntervalActorContarHistoria = setInterval(()=>{
                postMessage(this.historia[0]);
                this.historia.splice(0,1);
                console.log(this.historia);
                if(this.historia.length === 0){
                    postMessage('.');
                    clearInterval(idIntervalActorContarHistoria);
                    self.observerContinuacaoHistoria.notify();
                } else postMessage(' ');
            }, 1000)
        }
    }
}
