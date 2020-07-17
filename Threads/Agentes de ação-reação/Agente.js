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
var compreensaoASeremEliminadas = [ ];

function yellReply(_TimeOfReply){
    TimeOfReply = _TimeOfReply;
    if (! (timeIDReply === undefined))
        clearTimeout(timeIDReply)
    timeIDReply = setTimeout(()=>{
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
        if (TextoSaida == "")
            TextoSaida = "Desculpe não consegui te entender."
        const workerResult = 'Narrador: ' + TextoSaida;
        console.log('Worker: Posting message back to main script');
        postMessage(workerResult);  
        TextoSaida = "";
        ativo = false;
        Contexto.Residual = Contexto.Residual.concat(Contexto.Compreensao);
        Contexto.Compreensao = [];
        compreensaoASeremEliminadas = [ ];
    }, TimeOfReply)
}

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
    
    callAgent(){
        this.attend(this.acao, this.reacao, this.levelUpCtx, this.TimeOfReply);
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
        yellReply(TimeOfReply);
    }
    
    refuse(acao, reacao, levelUpCtx){
        if (! (this.refused))
            this.comply(acao, 'Você está repetitivo...', levelUpCtx, 5000);   
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
                Contexto.Compreensao.push(this.reacao);
                console.log('Disparador Ação-Reação acionado: "'+this.acaoFoco + this.acaoNivel1 +'" ');
                Contexto.Nivel2 = Contexto.Nivel2.concat(this.acaoFoco,this.acaoNivel1);      
            } 
        }
        if (! (this.levelUpCtx === undefined) )
            this.levelUpCtx();
    }
}
