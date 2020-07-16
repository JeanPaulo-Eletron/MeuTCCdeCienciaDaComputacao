importScripts('Padrões de projeto/Observer.js', 'Agentes de ação-reação/Agente.js');

const AgenteAcaoReacaoDeFocoObserver = new Observable();

const AgenteBem  = new agenteLevel1('TUDO','Tudo joia companheiro','BEM?','tudo o que?','oi tudo bem?');

const AgenteOi   = new agente('OI','oi, tudo bem?');
const AgenteTudo = new agente('TUDO','tudo o que?', ()=>{AgenteBem.callAgent()});

AgenteAcaoReacaoDeFocoObserver.subscribe(()=>{AgenteOi.callAgent()});
AgenteAcaoReacaoDeFocoObserver.subscribe(()=>{AgenteTudo.callAgent()});
