let game = {
  canvas: null,
  ctx: null,
  board: null,
  snake: null,
  apples: 0,
  width: 0,
  height: 0,
  dimensions: {
    max: {
      width: 640,
      height: 320,
    },
    min: {
      width: 300,
      height: 300,
    },
  },
  sprites: {
    background: null,
    body: null,
    bomb: null,
    cell: null,
    food: null,
    head: null,
  },
  sounds: {
    bomb: null,
    theme: null,
    food: null,
  },
  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.initDimensions();
    this.initStyleText();
  },
  initStyleText() {
    this.ctx.font = "14px Cactus";
    this.ctx.fillStyle = "#ffffff";
  },
  initDimensions() {
    let data = {
      maxWidth: this.dimensions.max.width,
      maxHeight: this.dimensions.max.height,
      minWidth: this.dimensions.min.width,
      minHeight: this.dimensions.min.height,
      realWidth: window.innerWidth,
      realHeight: window.innerHeight,
    };

    if (data.realWidth / data.realHeight > data.maxWidth / data.maxHeight)
      this.fitWidth(data);
    else this.fitHeight(data);

    this.canvas.height = this.height;
    this.canvas.width = this.width;
  },
  fitWidth(data) {
    this.width = data.maxWidth;
    this.height = Math.round((data.realHeight * this.width) / data.realWidth);
    this.height = Math.min(this.height, data.maxHeight);
    this.height = Math.max(this.height, data.minHeight);

    this.width = Math.round((data.realWidth * this.height) / data.realHeight);
    this.canvas.style.width = "100%";
  },
  fitHeight(data) {
    this.height = data.maxHeight;
    this.width = Math.round((data.realWidth * this.height) / data.realHeight);
    this.width = Math.min(this.width, data.maxWidth);
    this.width = Math.max(this.width, data.minWidth);

    this.height = Math.round((data.realHeight * this.width) / data.realWidth);
    this.canvas.style.height = "100%";
  },
  start() {
    this.init();
    this.preload(() => {
      this.run();
    });
  },
  preload(callback) {
    let loadedResource = 0;
    let requiredResource = Object.keys(this.sprites).length + Object.keys(this.sounds).length;

    let onLoadResource = () => {
      ++loadedResource;
      if (loadedResource === requiredResource) callback();
    };
    this.preloadSprites(onLoadResource);
    this.preloadSounds(onLoadResource);
  },
  preloadSprites(onLoadResource) {
    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = `sprites/${key}.png`;
      this.sprites[key].addEventListener("load", onLoadResource);
      };
  },
  preloadSounds(onLoadResource) {
    for (let key in this.sounds) {
      this.sounds[key] = new Audio();
      this.sounds[key].src = `sounds/${key}.mp3`;
      this.sounds[key].addEventListener("canplaythrough", onLoadResource, { once:true });
      };
  },
  create() {
    this.board.create();
    this.snake.create();
    this.board.createFood();
    this.board.createBomb();
    //Events
    window.addEventListener("keydown", (e) => {
      this.snake.start(e.code);
    });
  },
  update() {
    this.snake.move();
    this.render();
  },
  run() {
    this.create();
    this.gameInterval = setInterval(() => {
      this.update();
    }, 150);
    this.bombInterval = setInterval(() => {
      if (this.snake.moving) this.board.createBomb();
    }, 4000);
  },
  stop() {
    this.onSnakeDead();
    clearInterval(this.gameInterval);
    clearInterval(this.bombInterval);
    alert("Game Over");
    window.location.reload();
  },
  render() {
    window.requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(
        this.sprites.background,
        (this.width - this.sprites.background.width) / 2,
        (this.height - this.sprites.background.height) / 2
      );
      this.ctx.fillText(
        `Apples: ${this.apples}`,
        this.width / 2 - 140,
        this.height / 2 - 147
      );
      this.board.render();
      this.snake.render();
    });
  },
  random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  },
  onSnakeStart() {
    this.sounds.theme.loop = true;
    this.sounds.theme.play();
  },
  onSnakeEat() {
    ++this.apples;
    this.sounds.food.play();
    this.board.createFood();
  },
  onSnakeDead() {
    this.sounds.bomb.play();
  },
};

window.addEventListener("DOMContentLoaded", () => {
  game.start();
})