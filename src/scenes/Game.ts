import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {}
  create() {
    const map = this.make.tilemap({ key: "dungeon" });
    const tileset = map.addTilesetImage("dungeon", "tiles");

    map.createStaticLayer("Ground", tileset); // tao nen dat
    const wallslayer = map.createStaticLayer("Walls", tileset); // tao tuong

    wallslayer.setCollisionByProperty({ collides: true }); // ko di qua tuong

    const debugGraphics = this.add.graphics().setAlpha(0.7);
    wallslayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(234, 234, 46, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    });

    const faune = this.add.sprite(128, 128, "faune", "walk-down-3.png"); //dinh hinh nhan vat

    this.anims.create({
      key: "faune-idle-down",
      frames: [{ key: "faune", frame: "walk-down-3.png" }],
    }); // animetion cua nhan vat

    this.anims.create({
      key: "faune-run-down",
      frames: this.anims.generateFrameNames("faune", {
        start: 1,
        end: 8,
        prefix: "run-down-",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 15,
    }); // animetion cua nhan vat

    this.anims.create({
        key: "faune-run-up",
        frames: this.anims.generateFrameNames("faune", {
          start: 1,
          end: 8,
          prefix: "run-up-",
          suffix: ".png",
        }),
        repeat: -1,
        frameRate: 15,
      }); // animetion cua nhan vat

      this.anims.create({
        key: "faune-run-side",
        frames: this.anims.generateFrameNames("faune", {
          start: 1,
          end: 8,
          prefix: "run-side-",
          suffix: ".png",
        }),
        repeat: -1,
        frameRate: 15,
      }); // animetion cua nhan vat
 
 
    faune.anims.play("faune-run-side");
  }
}
