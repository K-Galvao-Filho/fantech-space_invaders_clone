import { createPlayer, updatePlayer } from "./player.js"; // Importa funções do módulo player.js
import { bullets, createBullets, updateBullets } from "./bullets.js"; // Importa funções do módulo bullets.js
import { enemies, createEnemies, updateEnemies } from "./enemies.js"; // Importa funções do módulo enemies.js

const config = { // Configurações do jogo
    type: Phaser.AUTO, // Usa WebGL se disponível, senão usa Canvas
    width: 800, // Usa toda a largura disponível
    height:600, // Usa toda a altura disponível
    parent: 'game-container',
    physics: {
        default: 'arcade', // Motor de física Arcade
        arcade: { debug: false } // Desativa o modo de depuração
    },
    scene: { preload, create, update } // Funções de callback
    
};

const game = new Phaser.Game(config); // Cria o jogo

function preload() { // Carrega os recursos do jogo
    this.load.image('player', 'assets/player.png'); // Carrega a imagem do jogador
    this.load.image('bullet', 'assets/bullet.png'); // Carrega a imagem do tiro
    this.load.image('enemy', 'assets/enemy.png'); // Carrega a imagem do inimigo
}

function create() {
    createPlayer(this);
    createBullets(this);
    createEnemies(this);

    //Só aqui os grupos estão prontos para colisão
    this.physics.add.overlap(
        bullets,
        enemies,
        (bullet, enemy) => {
            bullet.destroy();
            enemy.destroy();
        },
        null,
        this
    );
}

function update(time) { // Atualiza o jogo
    updatePlayer(time); // Atualiza o jogador
    updateBullets(); // Atualiza os tiros
    updateEnemies(this, time); // Atualiza os inimigos
}
