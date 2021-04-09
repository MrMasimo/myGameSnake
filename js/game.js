let game = {
  canvas: null,
  ctx: null,
  sprites: {
    background: null,
    body: null,
    bomb: null,
    cell: null,
    food: null,
    head: null,
  },

  start() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.preload(() => {
      this.render();
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
        if (loadedResource === requiredResource)
          callback();
      };
    }
  },
  render() {
    window.requestAnimationFrame(() => {
      this.ctx.drawImage(this.sprites.background, 0, 0);
      this.ctx.drawImage(this.sprites.body, 20, 0);
      this.ctx.drawImage(this.sprites.bomb, 0, 0);
    });
  },
};

window.addEventListener("DOMContentLoaded", () => {
  game.start();
})