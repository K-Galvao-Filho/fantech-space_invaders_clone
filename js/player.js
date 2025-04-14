import { bullets, shootBullet } from "./bullets.js"; 
// Importa variável e funções do módulo bullets.js

export let player; // Variável para o jogador
let cursors; // Variável para os controles do teclado

//INSERINDO VIDAS
//Update: Lives
export let lives = 3;

export function createPlayer(scene) { 
    // Função para criar o jogador
    player = scene.physics.add.sprite(scene.game.config.width / 2,
         scene.game.config.height - 60, 'player') 
         // Posiciona o jogador no centro e no fundo da tela
        .setCollideWorldBounds(true); 
        // Evita que o jogador saia da tela

    cursors = scene.input.keyboard.createCursorKeys(); 
    // Cria os controles do teclado
}

export function updatePlayer(time) { 
    //verifica se player ainda está ativo
    //Update: Lives
    if (!player.active) return;

    // Função para atualizar o jogador
    if (cursors.left.isDown) { 
        // Move o jogador para a esquerda
        player.setVelocityX(-300); 
        // Define a velocidade do jogador
    } else if (cursors.right.isDown) { 
        // Move o jogador para a direita
        player.setVelocityX(300); 
        // Define a velocidade do jogador
    } else { // Para o jogador
        player.setVelocityX(0); 
        // Define a velocidade do jogador
    }

    if (cursors.space.isDown) { 
        // Atira
        shootBullet(player.x, player.y - 20, time); 
        // Chama a função para atirar
    }
}
// INSERINDO RESET
export function resetPlayer(scene) {
    lives--;
    if (lives > 0) {
        player.setPosition(scene.game.config.width / 2, scene.game.config.height - 60);
        player.setActive(true).setVisible(true);
    } else {
        player.setActive(false).setVisible(false);
    }
}