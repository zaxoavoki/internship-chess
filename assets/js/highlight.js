const WHITE_CELL_COLOR = "#a9a9a9";
const BLACK_CELL_COLOR = "#696969";

function greySquare(source) {
  const cell = $("#root .square-" + source);
  cell.css(
    "background",
    cell.hasClass("black-3c85d") ? BLACK_CELL_COLOR : WHITE_CELL_COLOR
  );
}

function onMouseoverSquare(source, piece) {
  if (!piece) return;
  const moves = getPossibleMovesForPiece(piece, source);
  if (moves.length === 0) return;
  greySquare(source);
  for (let i = 0; i < moves.length; i++) {
    greySquare(moves[i]);
  }
}

function onMouseoutSquare() {
  $("#root .square-55d63").css("background", "");
}
