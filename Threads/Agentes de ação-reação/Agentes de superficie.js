importScripts('Agentes de ação-reação/Agentes Atores.js');

const AgenteAcaoReacaoDeFocoObserver = new Observable();

AgenteAcaoReacaoDeFocoObserver.subscribe(()=>{DelegadoAgenteOi.callAgent()});
AgenteAcaoReacaoDeFocoObserver.subscribe(()=>{DelegadoAgenteTudo.callAgent()});
