export let bullets; // Variável para os tiros
let lastFired = 0;  // Último tiro disparado

export function createBullets(scene) { // Função para criar os tiros
    bullets = scene.physics.add.group({ defaultKey: 'bullet', maxSize: 10 }); // Cria um grupo de tiros
}

export function shootBullet(x, y, time) { // Função para atirar
    if (time > lastFired) { // Verifica se pode atirar
        let bullet = bullets.get(x, y); // Pega um tiro do grupo
        if (bullet) { // Se houver um tiro disponível
            bullet.setActive(true); // Ativa o tiro
            bullet.setVisible(true); // Torna o tiro visível
            bullet.body.velocity.y = -400; // Define a velocidade do tiro 
            lastFired = time + 300; // Define o tempo do último tiro 
        }
    }
}

export function updateBullets() {
    if (!bullets || !bullets.children) return; // Garante que bullets e children existem

    bullets.children.each(function (bullet) {
        if (bullet.active && bullet.y < 0) {
            bullet.destroy(); // Ou desativa se preferir reaproveitar
        }
    });
}
