// Define a classe Menu que estende Phaser.Scene
export default class Menu extends Phaser.Scene {

    // Construtor da classe Menu
    constructor() {
        super({ key: 'Menu' }); // Chama o construtor da classe Phaser.Scene
    }

    // Pré-carrega os recursos necessários para o menu
    preload() {
        // Carrega as imagens do menu
        this.load.image("background", "assets/map/Menu/map.png");
        this.load.image("jogar", "assets/button/play.png");
    }

    // Cria os elementos visuais do menu
    create() {
        // Adiciona a imagem de fundo do menu
        this.add.image(640, 320, "background").setScale(2);

        // Adiciona o texto "Jogo individual" ao menu
        this.add.text(470, 145, 'Jogo individual', { fontFamily: 'Roboto', fontSize: '64px', fill: '#000000' });

        // Adiciona o botão "Jogar" ao menu e define sua interatividade
        this.botaoJogar = this.add.image(640, 360, "jogar").setScale(3);
        this.botaoJogar.setInteractive();
        this.botaoJogar.on("pointerup", this.apertouBotaoJogar, this);
    }

    // Função chamada quando o botão "Jogar" é pressionado
    apertouBotaoJogar() {
        this.botaoJogar.disableInteractive(); // Desabilita a interatividade do botão para evitar cliques repetidos
        this.comecarProximaCena("Game"); // Inicia a próxima cena, passando "Game" como parâmetro
    }

    // Função para iniciar a próxima cena
    comecarProximaCena(Game) {
        this.scene.start(Game); // Inicia a cena especificada
    }
}
