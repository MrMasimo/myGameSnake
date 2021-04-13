game.board = {
  size: 15,
  game: game,
  cells: [],
  create() {
    this.createCells();
  },
  createCells() {
    for (let row = 0; row < this.size; row++)
      for (let col = 0; col < this.size; col++)
        this.cells.push(this.createCell(row, col));
  },
  createCell(row, col) {
    let cellSize = this.game.sprites.cell.width + 1;
    let offsetX = (this.game.canvas.width - cellSize * this.size) / 2;
    let offsetY = (this.game.canvas.height - cellSize * this.size) / 2;
    return {
      row: row,
      col: col,
      x: col * cellSize + offsetX,
      y: row * cellSize + offsetY,
    };
  },
  getRandomAvalibleCell() {
    let pool = this.cells.filter((cell) => {
      return !cell.type&&!game.snake.hasCell(cell);
    });
    let randomAvalibleCell = game.random(0, pool.length - 1);
    return pool[randomAvalibleCell];
  },
  createObject(type) {
    let curCell = this.cells.find((cell) => cell.type === type);
    if (curCell) curCell.type = false;

    let randomCell = this.getRandomAvalibleCell();
    randomCell.type = type;
  },
  createFood() {
    this.createObject("food");
  },
  createBomb() {
    this.createObject("bomb");
  },
  isFoodCell(cell) {
    return cell.type === "food" ;
  },
  isBombCell(cell) {
    return cell.type === "bomb";
  },
  getCell(row, col) {
    return this.cells.find((cell) => cell.row === row && cell.col === col);
  },
  render() {
    this.cells.forEach((cell) => {
      this.game.ctx.drawImage(this.game.sprites.cell, cell.x, cell.y);
      if (cell.type)
        this.game.ctx.drawImage(this.game.sprites[cell.type], cell.x, cell.y);
    });
  },
};