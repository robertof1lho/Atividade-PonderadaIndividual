// Classe que define o personagem do jogo
export default class Personagem extends Phaser.Physics.Arcade.Sprite {

    // Variáveis para controle do personagem
    controles;
    teclaInteracao;
    pulando = false;
    velocidade = 200;
    velocidadePulo = -300;

    // Construtor da classe
    constructor(Game) {
        super(Game, 100, 450, "p_idle").setScale(1.7);
        // Configuração das teclas de controle
        this.controles = Game.input.keyboard.createCursorKeys();
        this.teclaInteracao = Game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.setCollideWorldBounds(true); // O personagem colide com os limites do mundo
    }

    // Adiciona o personagem à cena e inicia a animação de idle
    adicionarPersonagemACena(Game) {
        Game.add.existing(this);
        Game.physics.add.existing(this);
        this.anims.play("p_idle", true);
    }

    // Configura a interação do personagem (como pular, por exemplo)
    configurarInteracao(Game, funcao) {
        this.teclaInteracao.on("down", funcao, Game);
    }

    // Método para movimentação do personagem
    movimentar() {
        // Verifica se o personagem está no chão
        if (this.body.onFloor()) {
            this.pulando = false;
        }

        // Verifica se a tecla de pulo foi pressionada e o personagem não está pulando
        if (this.controles.up.isDown && !this.pulando) {
            this.pular();
        }

        // Verifica se o personagem está caindo
        if (this.body.velocity.y > 0 && this.pulando) {
            this.cair();
        }

        // Movimenta para a direita se a tecla correspondente estiver pressionada
        if (this.controles.right.isDown) {
            this.movimentarDireita();
            return;
        }

        // Movimenta para a esquerda se a tecla correspondente estiver pressionada
        if (this.controles.left.isDown) {
            this.movimentarEsquerda();
            return;
        }

        // Se não estiver pulando, reproduz a animação de idle
        if (!this.pulando) {
            this.anims.play('p_idle', true);
        }

        // Define a velocidade horizontal como 0 para parar o personagem
        this.setVelocityX(0);
    }

    // Movimenta o personagem para a direita
    movimentarDireita() {
        this.setVelocityX(this.velocidade);
        this.setFlipX(false);
        if (!this.pulando) {
            this.anims.play('p_run', true);
        }
    }

    // Movimenta o personagem para a esquerda
    movimentarEsquerda() {
        this.setVelocityX(-this.velocidade);
        this.setFlipX(true);
        if (!this.pulando) {
            this.anims.play('p_run', true);
        }
    }

    // Faz o personagem pular
    pular() {
        this.pulando = true;
        this.setVelocityY(this.velocidadePulo);
        this.anims.play('p_pulando', true);
    }

    // Faz o personagem cair
    cair() {
        this.anims.play('p_caindo', true);
    }

    // Carrega a spritesheet do personagem
    static carregarSpritesPersonagem(Game) {
        Game.load.spritesheet('p_idle', 'assets/mainCharacters/idle.png', {
            frameWidth: 128,
            frameHeight: 96
        });

        Game.load.spritesheet('p_andando', 'assets/mainCharacters/run.png', {
            frameWidth: 128,
            frameHeight: 96
        });

        Game.load.spritesheet('p_pulando', 'assets/mainCharacter/jump.png', {
            frameWidth: 128,
            frameHeight: 96
        });

        Game.load.spritesheet('p_caindo', 'assets/mainCharacters/fall.png', {
            frameWidth: 128,
            frameHeight: 96
        });
    }

    // Cria as animações do personagem
    static criarAnimacoesPersonagem(Game) {
        Game.anims.create({
            key: 'p_idle',
            frames: Game.anims.generateFrameNumbers('p_idle', {
                start: 0,
                end: 3 
            }),
            frameRate: 10,
            repeat: -1
        });

        Game.anims.create({
            key: 'p_andando',
            frames: Game.anims.generateFrameNumbers('p_andando', {
                start: 0,
                end: 7 
            }),
            frameRate: 10,
            repeat: -1
        });

        Game.anims.create({
            key: 'p_pulando',
            frames: Game.anims.generateFrameNumbers('p_pulando'),
            frameRate: 10,
            repeat: 0
        });

        Game.anims.create({
            key: 'p_caindo',
            frames: Game.anims.generateFrameNumbers('p_caindo'),
            frameRate: 10,
            repeat: 0
        });
    }

}
