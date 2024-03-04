import Personagem from "../personagem/personagem.js";

// Define a classe Game que estende Phaser.Scene
export default class Game extends Phaser.Scene {

    personagem; // Variável para armazenar o personagem
    mapa; // Variável para armazenar o mapa
    chao; // Variável para armazenar a camada de chão do mapa

    // Construtor da classe Game
    constructor() {
        super({ key: 'Game' }); // Chama o construtor da classe Phaser.Scene
    }

    // Pré-carrega os recursos necessários para o jogo
    preload() {
        // Carrega as imagens necessárias para o mapa
        this.load.image('nuvens', "./assets/map/png/clouds.png");
        this.load.image('mato', "./assets/map/png/far-grounds.png");
        this.load.image('ceu', "./assets/map/png/sky.png");
        this.load.image('terra', "./assets/map/png/tileset.png");

        // Carrega o arquivo JSON que define o mapa
        this.load.tilemapTiledJSON("mapa", "./assets/mapa/map(copia).json");

        // Carrega as sprites do personagem
        Personagem.carregarSpritesPersonagem(this);
    }

    // Cria os elementos do jogo
    create() {
        // Cria o mapa
        this.criarMapa();

        // Cria o personagem
        this.criarPersonagem();

        // Configura os limites do mundo
        this.configurarLimitesDoMundo();

        // Cria as animações do personagem
        Personagem.criarAnimacoesPersonagem(this);
    }

    // Cria o mapa do jogo
    criarMapa() {
        // Iniciando um tilemap vazio
        this.mapa = this.make.tilemap({ key: "mapa" });
    
        // Adicionando imagens ao tilemap
        const tilesetTerreno = this.mapa.addTilesetImage("tileset", "terra");
        const tilesetTerras = this.mapa.addTilesetImage("far-grounds", "mato");
        const tilesetCeu = this.mapa.addTilesetImage("sky", "ceu");
        const tilesetNuvens = this.mapa.addTilesetImage("clouds", "nuvens");
    
        // Criando camadas do tilemap
        const ceu = this.mapa.createLayer("sky", tilesetCeu, 0, 0);
        const nuvens = this.mapa.createLayer("clouds", tilesetNuvens, 0, 0);
        const terras = this.mapa.createLayer("far-grounds", tilesetTerras, 0, 0);
        this.chao = this.mapa.createLayer("tileset", tilesetTerreno, 0, 0);
    
        // Especificando que o chão é um objeto com que se pode colidir
        this.chao.setCollisionByProperty({ colider: true });
    }

    // Cria o personagem
    criarPersonagem() {
        this.personagem = new Personagem(this); // Instancia um novo Personagem

        this.personagem.adicionarPersonagemACena(this); // Adiciona o personagem à cena

        // Adiciona a colisão entre o personagem e o chão do nível
        this.physics.add.collider(this.personagem, this.chao);
    }
    
    // Configura os limites do mundo
    configurarLimitesDoMundo() {
        // Define os limites do mundo de acordo com o tamanho do mapa
        this.physics.world.setBounds(0, 0, this.mapa.widthInPixels, this.mapa.heightInPixels, true, true, true, true);
    }

    // Função chamada a cada frame para atualizar o jogo
    update() {
        this.personagem.movimentar(); // Atualiza a movimentação do personagem
    }
}
