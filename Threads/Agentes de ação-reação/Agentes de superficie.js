importScripts('Agentes de ação-reação/Agentes Atores.js');

const AgenteAcaoReacaoDeFocoObserver = new Observable();

const AgenteOi   = new agente('OI','oi, tudo bem?',60000);

const AgenteBem  = new agenteLevel1('TUDO','Tudo joia companheiro','BEM?','tudo o que?','oi tudo bem?');
const AgenteTudo = new agente('TUDO','tudo o que?', 10000, ()=>{AgenteBem.callAgent()});

AgenteAcaoReacaoDeFocoObserver.subscribe(()=>{AgenteOi.callAgent()});
AgenteAcaoReacaoDeFocoObserver.subscribe(()=>{AgenteTudo.callAgent()});
