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
        this.cells.push(
          this.createCell(row, col));

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
    let pool = this.cells.filter(cell => {
      return !game.snake.hasCell(cell);
    });
    let randomAvalibleCell = game.random(0, pool.length - 1);
    return pool[randomAvalibleCell];
  },
  createFood() {
    let curCell = this.cells.find(cell => cell.hasFood)
    if (curCell)
      curCell.hasFood = false;

    let randomCell = this.getRandomAvalibleCell();
    randomCell.hasFood = true;
  },
  isFoodCell(cell) {
    return cell.hasFood; ;
  },
  getCell(row, col) {
    return this.cells.find(cell => cell.row === row && cell.col === col);
  },
  render() {
    this.cells.forEach(cell => {
      this.game.ctx.drawImage(this.game.sprites.cell, cell.x, cell.y);
      if (cell.hasFood)
        this.game.ctx.drawImage(this.game.sprites.food, cell.x, cell.y);

    });
  },

};