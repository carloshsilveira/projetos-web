// ========== FIREWORKS ==========
let fireworksInstance = null;

function initFireworks() {
  const container = document.getElementById('fireworks-container');
  fireworksInstance = new Fireworks.Fireworks(container, {
    hue: { min: 0, max: 360 },
    acceleration: 1.03,
    brightness: { min: 50, max: 80 },
    decay: { min: 0.015, max: 0.03 },
    mouse: { click: true, move: false, max: 1 },
    intensity: 50
  });
}

function startFireworks() {
  if (fireworksInstance) {
    fireworksInstance.start();
  } else {
    console.warn('Fireworks não inicializado. Chame initFireworks() primeiro.');
  }
}

function stopFireworks() {
  if (fireworksInstance) {
    fireworksInstance.stop();
  }
}

// ========== JOGO ==========
let numMaximo = 300;
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;

initFireworks();
exibirMensagemInicial();

document.querySelector('.container__input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    verificarChute();
  }
});

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
}

function exibirMensagemInicial() {
  exibirTextoNaTela('h1', 'Jogo do número secreto');
  exibirTextoNaTela('p', 'Escolha um número entre 1 e ' + numMaximo);
}

function verificarChute() {
  let chute = document.querySelector('input').value;

  if (chute <= numMaximo && chute != '') {
    tentativas++;
    exibirTentativas();

    if (chute == numeroSecreto) {
      exibirTextoNaTela('h1', 'Você Acertou!');
      exibirTextoNaTela('p', 'Você descobriu o número secreto com ' + tentativas + ' tentativa(s).');
      document.getElementById('reiniciar').removeAttribute('disabled');
      startFireworks();

      setTimeout(() => {
        stopFireworks();
      }, 20000);

      document.getElementById('iniciar').disabled = true;
      document.querySelector('.container__input').disabled = true;


    } else {
      chute > numeroSecreto ?
        exibirTextoNaTela('p', 'O número secreto é Menor.') :
        exibirTextoNaTela('p', 'O número secreto é Maior.');
      limparCampo();
    }
  } else {
    exibirTextoNaTela('p', 'Digite um número menor que ' + numMaximo);
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numMaximo + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == numMaximo) {
    listaDeNumerosSorteados = [];
    alert('Os números já sorteados foram resetados. O Jogo irá reiniciar.');
  }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparCampo() {
  let chute = document.querySelector('input');
  chute.value = '';
}

function exibirTentativas() {
  let textoTentivas = document.getElementById('numeroDeTentativas');
  textoTentivas.innerHTML = `Tentativas: ${tentativas}`;
  let textoMelhorTurma = document.getElementById('melhorTurma');
  textoMelhorTurma.innerHTML = 'Record: Tarde<br>Aluno: Paulo Henrique';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 0;
  exibirTentativas();
  exibirMensagemInicial();
  limparCampo();
  document.getElementById('reiniciar').disabled = true;
  document.getElementById('iniciar').disabled = false;
  document.querySelector('.container__input').disabled = false;
  stopFireworks();
}
