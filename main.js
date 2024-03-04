// Importa as cenas do jogo
import Game from "./scenes/game.js";
import Menu from "./scenes/menu.js";

// Configurações do jogo
var config = {
    type: Phaser.AUTO, // Define o tipo de renderização (WebGL ou Canvas)
    autoCenter: Phaser.Scale.CENTER, // Centraliza o jogo na tela
    width: 1280, // Largura do jogo
    height: 640, // Altura do jogo
    scale: {
        mode: Phaser.Scale.FIT, // Modo de escala para ajustar ao tamanho da tela
    },
    physics: {
        default: 'arcade', // Usa o motor de física Arcade
        arcade: {
            gravity: { y: 750 }, // Define a gravidade do jogo
            debug: false // Ativa ou desativa o modo de depuração
        }
    },
    scene: [Menu, Game] // Lista de cenas a serem carregadas
};

// Cria uma nova instância do jogo com as configurações definidas
const game = new Phaser.Game(config);  
