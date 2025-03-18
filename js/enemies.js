export let enemies; // Grupo de inimigos
const enemyRows = 4; // Quantidade de linhas de inimigos
const enemyCols = 8; // Quantidade de colunas de inimigos
const enemySpeed = 40; // Velocidade inicial dos inimigos

let movingRight = true; // Direção inicial dos inimigos
let moveDown = false; // Indica se os inimigos devem descer
let moveTimer = 0; // Controla o tempo de movimento

export function createEnemies(scene) {
    enemies = scene.physics.add.group(); // Cria um grupo de inimigos

    const enemySpacingX = scene.game.config.width * 0.1; // Espaço entre os inimigos (10% da largura)
    const enemySpacingY = scene.game.config.height * 0.08; // Espaço entre linhas

    const startX = (scene.game.config.width - (enemyCols - 1) * enemySpacingX) / 2; // Centraliza os inimigos

    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            let enemy = scene.physics.add.sprite(
                startX + col * enemySpacingX, // Posição X
                100 + row * enemySpacingY,   // Posição Y
                'enemy' // Sprite do inimigo
            ).setScale(scene.game.config.width * 0.05 / 48); // Ajusta tamanho

            enemies.add(enemy); // Adiciona o inimigo ao grupo
        }
    }
}

export function updateEnemies(scene, time) {
    if (time > moveTimer) {
        let edgeHit = false; // Verifica se os inimigos atingiram a borda

        enemies.children.iterate(enemy => {
            if (movingRight) {
                enemy.x += 10; // Move os inimigos para a direita
                if (enemy.x >= scene.game.config.width - 50) {
                    edgeHit = true;
                }
            } else {
                enemy.x -= 10; // Move os inimigos para a esquerda
                if (enemy.x <= 50) {
                    edgeHit = true;
                }
            }
        });

        if (edgeHit) {
            movingRight = !movingRight; // Inverte a direção
            enemies.children.iterate(enemy => {
                enemy.y += 20; // Faz os inimigos descerem
            });
        }

        moveTimer = time + 500; // Controla a velocidade da movimentação
    }
}
