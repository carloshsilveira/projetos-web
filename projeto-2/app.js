let titulo = document.getElementById('texto__tiulo');
titulo.innerHTML = 'Jogo da Chave Secreta';

let pergunta = document.getElementById('texto__pergunta');
pergunta.innerHTML = 'Descubra o segredo do cadeado';

let numMaximo = 9;
let numeros = [];
let numAgora = 0;
gerarNumeroAleatorio();
let desbloqueado = 1;
let tentativas = 0;
let senhaAtual = numeros[numAgora];
bloquearInput()

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
    console.log(numeros)
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
    console.log(numAgora)
    console.log(senhaAtual)
    let input = `input${numAgora+1}`;
    let chute = document.getElementById(input).value;
    if (chute <= numMaximo && chute != '') {
        tentativas++;
        exibirTentativas();
        if (chute == senhaAtual) {
            exibirTextoNaTela('texto__pergunta', 'Você acertou o Digito da Senha. Siga para o próximo Digito.');
            document.getElementById(input).disabled = true;
            document.getElementById(input).classList.add('acerto');

            //startFireworks();

            //setTimeout(() => {
            //stopFireworks();
            //}, 20000);
            numAgora++;
            desbloqueado++;
            if (numAgora < numeros.length) {
                senhaAtual = numeros[numAgora]; // Atualiza a senha!
                bloquearInput();

            } else {
                exibirTextoNaTela('texto__pergunta', 'Senha completamente descoberta!!!');
                document.getElementById('iniciar').disabled = true;
                document.getElementById('reiniciar').disabled = false;
                // Aqui pode encerrar o jogo e mostrar mensagem de vitória.
            }

        } else {
            chute > senhaAtual ? exibirTextoNaTela('texto__pergunta', 'O número secreto é Menor.') : exibirTextoNaTela('texto__pergunta', 'O número secreto é Maior.');
            limparCampo(input);
        }

    } else {
        exibirTextoNaTela('texto__pergunta', 'Digite um número entre 0 e 9!');
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
}

function exibirTentativas() {
    let textoTentivas = document.getElementById('numeroDeTentativas');
    textoTentivas.innerHTML = `Tentativas: ${tentativas}`;
}   