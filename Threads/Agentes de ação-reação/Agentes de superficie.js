importScripts('Agentes de ação-reação/Agentes Atores.js');

const AgenteAcaoReacaoDeFocoObserver = new Observable();

const AgenteOi        = new agente('OI','oi, tudo bem?',60000);

const AgenteBem       = new agenteLevel1('TUDO','Tudo joia companheiro','BEM?','tudo o que?','oi tudo bem?');
const AgenteTudo      = new agente('TUDO','tudo o que?', 10000, ()=>{AgenteBem.callAgent()});

const DelegadoAgenteOi  = new Delegate(AgenteOi, ActorPreHistorico);
const DelegadoAgenteTudo = new Delegate(AgenteTudo, ActorPreHistorico);

AgenteAcaoReacaoDeFocoObserver.subscribe(()=>{DelegadoAgenteOi.callAgent()});
AgenteAcaoReacaoDeFocoObserver.subscribe(()=>{DelegadoAgenteTudo.callAgent()});
