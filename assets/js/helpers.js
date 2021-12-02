function checkMate(piece, target) {
  const [color, _] = piece;
  const position = board.position();
  const reverseColor = color === "w" ? "b" : "w";

  if (position[target] === reverseColor + "K") {
    DOMmessage.innerHTML = color.toUpperCase() + " won the game";
    game.isFinished = true;
  }
  const possibleMoves = Object.entries(position)
    .filter(([_, [c, __]]) => c === color)
    .map(([source, piece]) => getPossibleMovesForPiece(piece, source))
    .flat()
    .filter((source) => position[source] === reverseColor + "K");
  console.log(color, possibleMoves);
}

function isValidMove(piece, source, target) {
  return (
    piece[0] === game.move &&
    getPossibleMovesForPiece(piece, source).includes(target)
  );
}

function changePawnToQueen(piece, target) {
  const [color, figure] = piece;
  if (
    figure === "P" &&
    ((target.endsWith("8") && color === "w") ||
      (color === "b" && target.endsWith("1")))
  ) {
    setTimeout(
      () =>
        board.position({ ...board.position(), [target]: color + "Q" }, false),
      200
    );
  }
}

function resetGame() {
  DOMmessage.innerHTML = "";
  game.move = "w";
  board.clear(false);
  board.position(OPTIONS.position);
}
