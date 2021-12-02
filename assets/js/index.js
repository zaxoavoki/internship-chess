// DOM objects
const DOMmessage = document.getElementById("message");
const DOMresetBtn = document.getElementById("resetBtn");
const OPTIONS = {
  draggable: true,
  pieceTheme: "assets/images/{piece}.png",
  position: "3qk3/8/pppppppp/8/8/PPPPPPPP/8/3QK3",
  moveSpeed: "slow",
  snapbackSpeed: 500,
  snapSpeed: 100,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onDrop: onDrop,
};

// Global objects and variables
const game = {
  move: "w",
  isFinished: false,
  isMate: false,
};
const ALPHA = "abcdefgh";
const board = Chessboard("root", OPTIONS);

// TODO: заборону ходом фігур крім короля під час шаху
DOMresetBtn.addEventListener("click", resetGame);

function onDrop(source, target, piece, newPos, oldPos, orientation) {
  const isValid = isValidMove(piece, source, target);
  if (!isValid || game.isFinished) {
    return "snapback";
  }
  setTimeout(() => {
    checkMate(piece, target);
    changePawnToQueen(piece, target);
    makeRandomMove();
  }, 250);
}
