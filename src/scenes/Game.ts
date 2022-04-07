import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys; //khai bao nut an

  private faune!: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super("game");
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  create() {
    const map = this.make.tilemap({ key: "dungeon" });
    const tileset = map.addTilesetImage("dungeon", "tiles", 16, 16);

    map.createStaticLayer("Ground", tileset); // tao nen dat
    const wallslayer = map.createStaticLayer("Walls", tileset); // tao tuong

    wallslayer.setCollisionByProperty({ collides: true }); // ko di qua tuong

    // const debugGraphics = this.add.graphics().setAlpha(0.7);
    // wallslayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(234, 234, 46, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    // });

    this.faune = this.physics.add.sprite(128, 128, "faune", "walk-down-3.png");
    //dinh hinh nhan vat
    this.faune.body.setSize(this.faune.width * 0.5, this.faune.height * 0.8);
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

    this.faune.anims.play("faune-idle-down"); //nhan vat xuat hien
    this.physics.add.collider(this.faune, wallslayer); // khong cho di qua tuong
    this.cameras.main.startFollow(this.faune, true); //camera man
  }

  update(t: number, dt: number) {
    const speed = 100;
    if (!this.cursors || !this.faune) {
      return;
    }
    if (this.cursors.left?.isDown) {
      //di chuyen sang trai
      this.faune.anims.play("faune-run-side", true);
      this.faune.setVelocity(-speed, 0);

      this.faune.scaleX = -1;
      this.faune.body.offset.x = 24;
    } else if (this.cursors.right?.isDown) {
      //di chuyen sang phai
      this.faune.anims.play("faune-run-side", true);
      this.faune.setVelocity(speed, 0);

      this.faune.scaleX = 1;
      this.faune.body.offset.x = 8;
    } else if (this.cursors.up?.isDown) {
      //di chuyen len tren
      this.faune.play("faune-run-up", true);
      this.faune.setVelocity(0, -speed);
    } else if (this.cursors.down?.isDown) {
      //di chuyen xuong duoi
      this.faune.play("faune-run-down", true);
      this.faune.setVelocity(0, speed);
    } else {
      const parts = this.faune.anims.currentAnim.key.split("-");
      parts[1] = "idle";
      this.faune.play(parts.join("-"));
      this.faune.setVelocity(0, 0);
    }
  }
}
