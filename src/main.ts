
import Phaser from "phaser";

import Preloader from "./scenes/Preloader";
import Game from "./scenes/Game";


export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 1000,
  height: 1000,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true, // vien quanh 
    },
  },
  scene: [Preloader, Game], // su dung cac man
  scale: {
    zoom: 2,
  },
});
