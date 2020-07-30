importScripts('Agentes de ação-reação/3_Agentes Atores.js');

const AgenteAcaoReacaoDeFocoObserver = new Observable();

AgenteAcaoReacaoDeFocoObserver.subscribe(()=>{DelegadoAgenteOi.callAgent()});
AgenteAcaoReacaoDeFocoObserver.subscribe(()=>{DelegadoAgenteTudo.callAgent()});
