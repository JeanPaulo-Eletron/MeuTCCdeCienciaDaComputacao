importScripts('Padrões de projeto/4_Delegation_Forwarding.js');

function actorPreHistoricoCallBack(){
    DelegadoHistorico.contarHistoria();
    AgentesActor.unsubscribe(actorPreHistoricoCallBack);
}

const historiaActorStart = 'Olá meu nome é ...';
const historiaActorPreHistorico = 'No inicio'/* de tudo que conhecemos, todo nosso céu, a terra, quem nos amamos, estava tudo em um lugar só, concentrado em um minusculo ponto, todo o espaço estava concentrado em um pequeno ponto menor que um átomo, era impossível que uma matéria se afastasse da outra pelo simples fato de não ter espaço para isso, a direita se via matéria, a esquerda se via matéria, a cima se via matéria, atrás se via matéria, em baixo se via matéria e a frente também! Não importa o quanto uma matéria andasse, ela acabaria voltando no mesmo lugar.\nAté que veio a expansão e permitiu com que a matéria tivesse espaço para crescer, e aquecer, e assim em uma grande explosão, o Big Bang nasceu o universo, os átomos, as estrelas, tudo nasceu naquele período a mais de 13 bilhões de anos nascia tudo que conhecemos.'*/
observerContinuacaoHistoria = new Observable();


const AgentePreHistorico = new Actor(historiaActorPreHistorico);
const agenteActorHistoricoStart = new Actor(historiaActorStart, observerContinuacaoHistoria);

const AgentesActor = new Observable();

observerContinuacaoHistoria.subscribe(()=>{
    DelegadoHistorico.Actor = AgentePreHistorico;
    AgentesActor.subscribe(actorPreHistoricoCallBack);
    observerContinuacaoHistoria.unsubscribe();  
});
  
const AgenteBem       = new agenteLevel1('TUDO','Tudo joia companheiro','BEM?','tudo o que?','oi tudo bem?');

var   DelegadoHistorico = new Delegate(agenteActorHistoricoStart);
const DelegadoAgenteOi  = new Delegate(DelegadoHistorico.Actor,'OI','oi, tudo bem?',60000);
const DelegadoAgenteTudo = new Delegate(DelegadoHistorico.Actor, 'TUDO','tudo o que?', 10000, ()=>{AgenteBem.callAgent()});

AgentesActor.subscribe(actorPreHistoricoCallBack);