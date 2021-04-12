let game = {
  canvas: null,
  ctx: null,
  board: null,
  snake: null,
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
  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.initDimensions();
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
    let requiredResource = Object.keys(this.sprites).length;
    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = `sprites/${key}.png`;
      this.sprites[key].onload = () => {
        ++loadedResource;
        if (loadedResource === requiredResource) callback();
      };
    }
  },
  create() {
    this.board.create();
    this.snake.create();
    this.board.createFood();
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
    setInterval(() => {
      this.update();
     }, 150);
  },
  render() {
    window.requestAnimationFrame(() => {
      //this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(
        this.sprites.background,
        (this.width - this.sprites.background.width) / 2,
        (this.height - this.sprites.background.height) / 2
      );
      this.board.render();
      this.snake.render();
    });
  },
  random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  },
};

window.addEventListener("DOMContentLoaded", () => {
  game.start();
})