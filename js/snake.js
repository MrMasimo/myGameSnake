game.snake = {
  game: game,
  cells: [],
  create() {
    let startCell = [
      { row: 7, col: 7 },
      { row: 7, col: 8 },
    ];
    startCell.forEach(cell => this.cells.push(game.board.getCell(cell.row, cell.col)));
  },

  render() {
    this.cells.forEach((cell) => this.game.ctx.drawImage(this.game.sprites.body, cell.x, cell.y));
   },

};