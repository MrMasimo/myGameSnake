game.snake = {
  game: game,
  moving: false,
  cells: [],
  directions: {
    up: {
      row: -1,
      col: 0,
    },
    down: {
      row: 1,
      col: 0,
    },
    right: {
      row: 0,
      col: 1,
    },
    left: {
      row: 0,
      col: -1,
    },
  },
  nextDirection: null,
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
    this.moving = true;
    switch (keyCode) {
      case "ArrowUp":
        this.nextDirection = this.directions.up;
        break;
      case "ArrowDown":
        this.nextDirection = this.directions.down;
        break;
      case "ArrowRight":
        this.nextDirection = this.directions.right;
        break;
      case "ArrowLeft":
        this.nextDirection = this.directions.left;
        break;
    };
  },
  move() {
    if (this.moving) {
      let nextCell = this.getNextCell();
      if (nextCell) {
        this.cells.unshift(nextCell);
        if (!game.board.isFoodCell(nextCell))
          this.cells.pop();
        else game.board.createFood();
      }
    }
  },

  hasCell(cell) {
    return this.cells.find(part => part === cell)

  },
  getNextCell() {
    let headSnake = this.cells[0];
    let nextCellRow = headSnake.row + this.nextDirection.row;
    let nextCellCol = headSnake.col + this.nextDirection.col;
    return game.board.getCell(nextCellRow, nextCellCol);
  },

  render() {
    this.cells.forEach((cell) =>
      this.game.ctx.drawImage(this.game.sprites.body, cell.x, cell.y)
    );
  },
};