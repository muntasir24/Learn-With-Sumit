import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="bg-white border border-gray-400 h-12 w-12 m-1 leading-9 text-lg"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = [...squares];
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="mb-4 text-xl font-bold">{status}</div>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  function handlePlay(nextSquares) {
    setXIsNext(!xIsNext);
    const newHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move # ${move}`;
    } else {
      description = `Go to start the Game`;
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="flex justify-center p-4">
      <div className="mr-16">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        ></Board>
      </div>
      <ol className="border border-gray-400 p-2 text-lg font-bold shadow-xl">{moves}</ol>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
