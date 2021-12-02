function getPossibleMovesForPiece(piece, source) {
  // Additional function to get all possible moves without blocking king
  function getPosibbleCommonMoves(piece, source, parentFigure = "") {
    const [color, figure] = piece;
    return (
      {
        Q: getPossibleQueenMoves,
        K: getPossibleKingMoves,
        P: getPossiblePawnMoves,
      }[figure] || (() => [])
    )(color, source, parentFigure === "K");
  }

  const [color, figure] = piece;
  const possibleAttackedCells = Object.entries(board.position())
    .filter(([_, figure]) => figure[0] === (color === "w" ? "b" : "w"))
    .map(([s, f]) => getPosibbleCommonMoves(f, s, figure))
    .flat();
  return getPosibbleCommonMoves(piece, source).filter(
    (e) => figure !== "K" || !possibleAttackedCells.includes(e)
  );
}

function getPossiblePawnMoves(color, source, attacker = false) {
  const exp = color === "w" ? 1 : -1;
  return getFilteredMoves(source, [
    (e) => e[0] + (+e[1] + exp), // up
    (e) => ALPHA[ALPHA.indexOf(e[0]) - 1] + (+e[1] + exp), // left up
    (e) => ALPHA[ALPHA.indexOf(e[0]) + 1] + (+e[1] + exp), // right up
  ]).filter((e, i) =>
    attacker
      ? i !== 0
      : (i > 0 &&
          board.position()[e] &&
          String(board.position()[e]).startsWith(color === "w" ? "b" : "w")) ||
        (i < 1 && !board.position()[e])
  );
}

function getPossibleKingMoves(color, source) {
  return getFilteredMoves(source, [
    (e) => e[0] + (e[1] - 1), // down
    (e) => e[0] + (+e[1] + 1), // up
    (e) => ALPHA[ALPHA.indexOf(e[0]) + 1] + e[1], // right
    (e) => ALPHA[ALPHA.indexOf(e[0]) - 1] + e[1], // left
  ]).filter((e) => !String(board.position()[e]).startsWith(color));
}

function getPossibleQueenMoves(color, source) {
  return [
    ...getPossibleKingMoves(color, source),
    ...getFilteredMoves(source, [
      (e) => ALPHA[ALPHA.indexOf(e[0]) - 1] + (e[1] - 1), // left down
      (e) => ALPHA[ALPHA.indexOf(e[0]) - 1] + (+e[1] + 1), // left up
      (e) => ALPHA[ALPHA.indexOf(e[0]) + 1] + (e[1] - 1), // right down
      (e) => ALPHA[ALPHA.indexOf(e[0]) + 1] + (+e[1] + 1), // right up
    ]).filter((e) => !String(board.position()[e]).startsWith(color)),
  ];
}

function getFilteredMoves(source, moves) {
  return moves
    .map((e) => e(source))
    .filter((e) => e && !e.includes("0") && !e.includes("9"));
}
