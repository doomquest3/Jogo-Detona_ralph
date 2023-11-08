// Estados do jogo.
const state ={
    // Variaveis para alterar efeito visual na tela.
    view:{
        squares: document.querySelectorAll(".square"),
        inimigo: document.querySelector(".inimigo"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector('#score'),
        heart: document.querySelector('#vidas'),
    },
    // Variaveis de tempo, velocida de jogo, ponto de colisão e pontos totais
    values:{
        velocidadeJogo:1000,
        pontoColisao:0,
        resultado:0,
        tempoAtual:60,
        vidas:3,
    },actions:{
        timerId: setInterval(randomSquare, 1000),
        contagemTempoId: setInterval(contagem, 1000),
        
    }
};

function contagem(){
    state.values.tempoAtual--;
    state.view.timeLeft.textContent = state.values.tempoAtual;
    if(state.values.tempoAtual<=0){
        clearInterval(state.actions.contagemTempoId)
        clearInterval(state.actions.timerId)
        alert("O seu tempo acabou, sua pontuação é de: "+state.values.resultado+"");

    }
    
}

// Criar audio ao clicar no ralph
function tocarSom(audioName){
    let audio = new Audio(`./src/audio/${audioName}.m4a`);
    audio.play();

}

// Verificar vidas do jogador.
function verificarVidas(){
    if(state.values.vidas === 0){
        state.view.heart.textContent = "X"+state.values.vidas;
        
        alert("GAME OVER! Tente novamente, sua pontuação total é: "+state.values.resultado)
        window.location.reload();
        
        
    }
}



// Seleciona um quadrado aleatório.
function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove('inimigo');
    });

    let numAleatorio = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[numAleatorio];

    randomSquare.classList.add('inimigo');
    state.values.pontoColisao = randomSquare.id;

}

// Função para verificar ação de clique no jogo.
function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener('mousedown',()=>{
            verificarVidas();
            if(square.id === state.values.pontoColisao){
                state.values.resultado++;
                state.view.score.textContent = state.values.resultado;
                state.values.pontoColisao = null;
                tocarSom("damageSound");

            }else if(square.id !== state.values.pontoColisao){
                state.view.heart.textContent = "X" + state.values.vidas--;
                
            }
            
        })
    });
    
}

// Função para iniciar o jogo.
function iniciar(){  
    addListenerHitBox();

}

// Chamar a função principal.
iniciar()