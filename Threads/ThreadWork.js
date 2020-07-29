importScripts('Tratamento de texto/Utilitarios.js', 'Agentes de ação-reação/Agentes de superficie.js');

function Processar() {
    AgentesActor.notify();
    AgenteAcaoReacaoDeFocoObserver.notify();
}

/* INICIO */

onmessage = function(e) {
    console.log('Worker: Message received from main script');
    Contexto.Foco = Contexto.Foco.concat(tratarCaracteresEspeciais(removerVogaisRepetidas(GetWords(e.data))));
    console.log("Foco: " + Contexto.Foco)
    Processar();
}

/*
Requisito:
° A cada 10 segundos o contexto que está no contexto Foco será movido para a memória de trabalho, depois de 5 segundos a informação deve ser declarada como informação legada a frase que se deseja formular.(* Se ouver um "." todas as palavras que precederem esse "." serão movidas do contexto Foco para a memória de trabalho quando ele der a resposta).
° O objetivo da memória de trabalho é dar suporte reativo aos agentes que tentam coompreender as informações presentes no contexto Foco, então eles iram verificar se há alguma correspondencia entre o que há no contexto Foco e as informações presentes na memória de trabalho e se houverem eles irão fazer inferencias de Contexto em cima disso.
° Depois de 30 segundos a memoria de trabalho é movida para memória de longo prazo.
° Niveis de contexto: A I.A tera uma compreensão, porém ela pode ter uma coompreensão em cima dessa coompreesão, essa é uma compreensão classificada como de contexto nível 2, e essa pode ter uma coomprensão em cima dela recursivas vezes, podendo ter nível 3, 4....
° Memoria de trabalho: Irá existir um "universo" isolado de niveis de contexto e agentes de compreensãopara ele, a idéia é que as mudanças de compreensão nessa camada se tornem mais raras e o principal se concentre logo nos primeiros 5 segundos de análise no contexto Foco, porém toda informação de contexto obtida na compreensão da memória de trabalho tem prioridade sobre as demais formas de obtenção de coompreensão já que o agente teve mais tempo para deliberar sobre as informações em uma gama muito maior de fontes (a memoria de trabalho recebe informações da memória de longo prazo para ajudar na deliberação).
° Memória de longo prazo: Haverá agentes de coompreensão que deverão receber informações advindas do ObserverPublicitário que informará o status de coompreensão e as deliberações dos agentes presentes na memória de curto prazo, sempre que perceber que tem uma informação util para esses agentes na memória de curto prazo ele acrescenta essa informação a memoria de curto prazo e requisita um "tell" aos agentes para que os interessados (observer) em informações daquele tipo sejam avisados da sua presença e deliberem em cima dela.
° Módulo Publicitário: O ObeserverPublicitario é o responsavel por avisar aos agentes mudanças nas informações presente no contextoFoco, contexto Compreensao e nos níveis de contexto, o agente pode optar por receber tudo, ou receber apenas informações do tipo que ele quiser.
° Propagação entre niveis de contexto: Toda vez que uma informação do contexto Foco gera uma compreensão, essa compreensão vai ao nível de contexto 1, lá os agentes de nível 1 vão analisar todas as informações do nivel 1 e do contexto Foco e verificar se há espaço para realizar outra inferencia e com ela realizar uma mutação na compreensão pré-existente, ao fazer isso ele inutiliza aquela compreensão anterior(mantendo ela no nível 1 como uma memória, colocando a nova no nível 2), para adicionar essa compreensão nova ao nível 2 ele solicita a um agente informante que informe ao nível 2 essa dedução, se ela já existe agente ignora, e ele não substitui o contexto novamente e nem adiciona novamente ao nível 2, senão ele altera o Contexto e adiciona essa inferencia ao nível 2... isso pode continuar indefinidas vezes.
° Contexto resídual: Adicionar informação residual após remover um item do Compreensao, deverá haver uma agente de gatilho(sempre que um item for removido do contexto Compreensao, antes dele ser removido ele será acionado e decidira o que irá para o residual, porém da mesma forma que o contexto Foco, ele tera marcado o tempo que ele foi colocado lá. 
° Adicionar um agente que remove um item da informação residual depois de um certo tempo. *1
° O objetivo da base de conhecimento é conectar lógicamente dados em comum, simulando o conhecimento estruturado.
° Adicionar limite de tamanho para a base de conhecimento, sempre que chegar naquele limite diminuir o tamanho do vetor em 10%.
  ° Elaborar forma de remover os 10% menos relevantes (menos reforçados, quanto mais antiga as citações a aquela informação e menor a quantidade daquela citação mais elegivel a descarte estara)
° O Agente pode reagir de acordo com o tema também, por exemplo: "Big Bang".

*1 - Simula memória de curto prazo.
*2 - Simula memória de longo prazo.
*/