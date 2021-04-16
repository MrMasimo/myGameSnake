game.snake = {
  game: game,
  moving: false,
  cells: [],
  directions: {
    up: {
      row: -1,
      col: 0,
      rotation: 0,
    },
    down: {
      row: 1,
      col: 0,
      rotation: 180,
    },
    right: {
      row: 0,
      col: 1,
      rotation: 90,
    },
    left: {
      row: 0,
      col: -1,
      rotation: 270,
    },
  },
  nextDirection: null,
  nextRotation: null,
  create() {
    this.nextDirection = this.directions.up;
    let startCell = [
      { row: 7, col: 7 },
      { row: 8, col: 7 },
    ];
    startCell.forEach((cell) =>
      this.cells.push(game.board.getCell(cell.row, cell.col))
    );
  },
  start(keyCode) {


    switch (keyCode) {
      case "ArrowUp":
        this.nextDirection = this.directions.up;
        this.nextRotation = this.directions.up.rotation;
        break;
      case "ArrowDown":
        this.nextDirection = this.directions.down;
        this.nextRotation = this.directions.down.rotation;
        break;
      case "ArrowRight":
        this.nextDirection = this.directions.right;
        this.nextRotation = this.directions.right.rotation;
        break;
      case "ArrowLeft":
        this.nextDirection = this.directions.left;
        this.nextRotation = this.directions.left.rotation;
        break;
    }
    if (!this.moving)
      this.game.onSnakeStart();
    this.moving = true;
  },
  move() {
    if (this.moving) {
      let nextCell = this.getNextCell();
      if (!nextCell || this.hasCell(nextCell) || this.game.board.isBombCell(nextCell)) {
        this.game.stop();
       }
      if (nextCell) {

        this.cells.unshift(nextCell);
        if (!game.board.isFoodCell(nextCell))
          this.cells.pop();
        else {
          this.game.onSnakeEat();
        }
      }
    }
  },

  hasCell(cell) {
    return this.cells.find((part) => part === cell);
  },

  getNextCell() {
    let headSnake = this.cells[0];
    let nextCellRow = headSnake.row + this.nextDirection.row;
    let nextCellCol = headSnake.col + this.nextDirection.col;
    return game.board.getCell(nextCellRow, nextCellCol);
  },

  render() {
    this.renderHead();
    this.renderBody();
  },
  renderBody() {
    for (let i = 1; i < this.cells.length; i++)
      this.game.ctx.drawImage(
        this.game.sprites.body,
        this.cells[i].x,
        this.cells[i].y
      );
  },
  renderHead() {
    let head = this.cells[0];
    this.game.ctx.save();
    this.game.ctx.translate(
      head.x + this.game.sprites.head.width / 2,
      head.y + this.game.sprites.head.height / 2
    );
    this.game.ctx.rotate((this.nextRotation * Math.PI) / 180);
    this.game.ctx.drawImage(
      this.game.sprites.head,
      -this.game.sprites.head.width / 2,
      -this.game.sprites.head.height / 2
    );
    this.game.ctx.restore();
  },
};