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

class agente{
    constructor(acao, reacao, levelUpCtx){
        this.acao       = acao;
        this.reacao     = reacao;
        this.levelUpCtx = levelUpCtx;
    }
    callAgent(){
        console.log(this.acao);
        let Tamanho       = Contexto.Foco.length;
        let IndexVet      = Contexto.Foco.indexOf(this.acao);
        if (IndexVet!==-1){
            Contexto.Foco.splice(IndexVet, 1);
            Contexto.Compreensao.push(this.reacao);
            console.log('Disparador Ação-Reação acionado: "'+this.acao+'" ');
            Contexto.Nivel1 = Contexto.Nivel1.concat(this.acao);
        }
        if (! (this.levelUpCtx === undefined) )
            this.levelUpCtx();
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
