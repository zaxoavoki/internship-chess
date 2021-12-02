function makeRandomMove() {
  const blackFigures = Object.entries(board.position()).filter((e) =>
    e[1].startsWith("b")
  );
  const randomFigure =
    blackFigures[Math.floor(Math.random() * blackFigures.length)];
  const [source, piece] = randomFigure;
  const moves = getPossibleMovesForPiece(piece, source);
  // TODO: Check stalemate
  if (moves.length === 0) {
    return makeRandomMove();
  }
  const target = moves[Math.floor(Math.random() * moves.length)];
  board.move(source + "-" + target);
  changePawnToQueen(piece, target);
  checkMate(piece, target);
}
