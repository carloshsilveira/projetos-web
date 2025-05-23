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

// Jogo 

initFireworks();

let numMaximo = 20;

let numeros = [];
let numAgora = 0;
gerarNumeroAleatorio();
let desbloqueado = 1;
let tentativas = 0;
let senhaAtual = numeros[numAgora];
bloquearInput()


exibirTextoNaTela('texto__tiulo', 'Jogo da Chave Secreta');

exibirTextoNaTela('texto__pergunta', `Descubra o segredo do cadeado. Digite um número entre 1 e ${numMaximo}.`);

// Seleciona todos os inputs dentro do container__blocos
const inputs = document.querySelectorAll('.container__blocos input');

inputs.forEach(input => {
  input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      verificarChute();
    }
  });
});


function gerarNumeroAleatorio() {
    for (let i=0; i<4; i++) {
        let numeroEscolhido = parseInt(Math.random() * numMaximo + 1);
        numeros.push(numeroEscolhido)
    }
}

function bloquearInput() {
    if (desbloqueado === 1) {
        document.getElementById('input1').disabled = false;
    }
    else if (desbloqueado === 2) {
        document.getElementById('input2').disabled = false;
    }
    else if (desbloqueado === 3) {
        document.getElementById('input3').disabled = false;
    }
    else {
        document.getElementById('input4').disabled = false;
    }
}

function verificarChute() {
    let input = `input${numAgora+1}`;
    let chute = document.getElementById(input).value;
    if (chute <= numMaximo && chute != '') {
        tentativas++;
        exibirTentativas();
        if (chute == senhaAtual) {
            exibirTextoNaTela('texto__pergunta', 'Você acertou o Digito da Senha. Siga para o próximo Digito.');
            document.getElementById(input).disabled = true;
            document.getElementById(input).classList.add('acerto');

            numAgora++;
            desbloqueado++;

            if (numAgora < numeros.length) {
                senhaAtual = numeros[numAgora];
                bloquearInput();

                // Muda o foco para o próximo input desbloqueado
                let proximoInput = document.getElementById(`input${numAgora + 1}`);
                if (proximoInput) {
                    proximoInput.focus();
                }

            } else {
                startFireworks();

                setTimeout(() => {
                    stopFireworks();
                }, 20000);
                exibirTextoNaTela('texto__pergunta', 'Senha completamente descoberta!!!');
                document.getElementById('iniciar').disabled = true;
                document.getElementById('reiniciar').disabled = false;
            }

        } else {
            chute > senhaAtual ? exibirTextoNaTela('texto__pergunta', 'O número secreto é Menor.') : exibirTextoNaTela('texto__pergunta', 'O número secreto é Maior.');
            limparCampo(input);
        }

    } else {
        exibirTextoNaTela('texto__pergunta', `Digite um número entre 0 e ${numMaximo}.`);
        limparCampo(input);
    }
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.getElementById(tag);
    campo.innerHTML = texto;
}

function limparCampo(input) {
    let chute = document.getElementById(input);
    chute.value = '';
}

function reiniciarJogo() {
    stopFireworks();

    // Zera variáveis
    numeros = [];
    numAgora = 0;
    desbloqueado = 1;
    tentativas = 0;
    exibirTentativas();

    // Gera nova senha
    gerarNumeroAleatorio();
    senhaAtual = numeros[numAgora];

    // Limpa os inputs e desativa todos
    for (let i = 1; i <= 4; i++) {
        let input = document.getElementById(`input${i}`);
        input.value = '';
        input.disabled = true;
        input.classList.remove('acerto'); // Remove classe visual de acerto (se existir)
    }

    // Ativa o primeiro input novamente
    bloquearInput();

    // Desativa o botão de reiniciar até o próximo acerto
    document.getElementById('reiniciar').setAttribute('disabled', true);

    // Ativa o botão Chutar
    document.getElementById('iniciar').disabled = false;

    exibirTextoNaTela('texto__pergunta', `Descubra o segredo do cadeado. Digite um número entre 1 e ${numMaximo}.`);
}

function exibirTentativas() {
    let textoTentivas = document.getElementById('numeroDeTentativas');
    textoTentivas.innerHTML = `Tentativas: ${tentativas}`;
}   