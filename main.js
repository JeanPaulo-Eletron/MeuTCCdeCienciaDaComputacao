var BtnEnviar   = document.querySelector('#BtnEnviar')
CaixaDeResposta = document.querySelector('#CaixaDeResposta')
if (window.Worker) {
    var myWorker = new Worker('Threads/ThreadWork.js');
	BtnEnviar.onclick = ()=>{
        myWorker.postMessage(CaixaDeTexto.value)
        console.log('Message posted to worker');
    }

	myWorker.onmessage = function(e) {
        CaixaDeResposta.textContent += e.data + "\n";
		console.log('Message received from worker'+e.data);
	}
} else {
	console.log('Your browser doesn\'t support web workers.')
}