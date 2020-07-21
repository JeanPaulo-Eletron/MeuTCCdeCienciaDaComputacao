var BtnEnviar   = document.querySelector('#BtnEnviar')
var CaixaDeResposta = document.querySelector('#CaixaDeResposta')
var CaixaDeTexto = document.querySelector('#CaixaDeTexto')
if (window.Worker) {
    var myWorker = new Worker('Threads/ThreadWork.js');
	BtnEnviar.onclick = btnEnviarOnClick;
    function btnEnviarOnClick(){
        myWorker.postMessage(CaixaDeTexto.value)
        console.log('Message posted to worker');
        CaixaDeTexto.value = "";
    };
    CaixaDeTexto.addEventListener("keydown",(e) => {
        if ((e.keyCode === 13) && (CaixaDeTexto.value !== ""))
            btnEnviarOnClick();
    }); 
    
	myWorker.onmessage = function(e) {
        CaixaDeResposta.textContent += e.data;
		console.log('Message received from worker'+e.data);
	}
} else {
	console.log('Your browser doesn\'t support web workers.')
}