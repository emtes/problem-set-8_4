import React, { useState } from 'react';

function App() {
  return <NoughtsCrosses />;
}

function NoughtsCrosses() {
  const defaultGame = {
    board: Array(9).fill(null),
    isXNext: true,
    history: [Array(9).fill(null)],
  };
  const [game, setGame] = useState(defaultGame);
  const { board, isXNext, history } = game;
  const winner = getWinner(board);

  const handlePlay = (i) => {
    if (winner || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setGame({
      ...game,
      board: newBoard,
      isXNext: !isXNext,
      history: [...history, [...newBoard]],
    });
  };

  const newGame = () => setGame(defaultGame);

  return (
    <>
      <h1>Noughts and Crosses</h1>
      <button onClick={newGame}>New Game</button>
      <p>
        Next Player:
        {isXNext ? ' X' : ' O'}
      </p>
      {winner && <p>{`The winner is ${winner}!`}</p>}
      <Board board={board} handlePlay={handlePlay} />
      <History history={history} game={game} setGame={setGame} />
    </>
  );
}

function Board({ board, handlePlay }) {
  return (
    <>
      {board.map((slot, i) => (
        <Cell key={Ids.new()} play={() => handlePlay(i)} value={board[i]} />
      ))}
    </>
  );
}

function Cell({ value, play }) {
  return (
    <button onClick={play} className="game-cell">
      __
      {' '}
      {value}
      {' '}
      __
    </button>
  );
}

function History({ history, game, setGame }) {
  function travelToMove(i) {
    const next = i % 2 === 0;
    const newGame = { ...game, board: history[i], isXNext: next };
    setGame(newGame);
  }
  return (
    <>
      <h2>History</h2>
      {history.length > 1 && (
        <p>
          Hi being of the multiverse! Please go to most recent move before continuing to play.
          Alternate timelines will result in catastrophic failure.
        </p>
      )}
      <ol>
        {history.map((board, i) => (
          <li key={Ids.new()} onClick={() => travelToMove(i)}>
            {i > 0 ? `Go to move ${i}` : 'Go to start'}
          </li>
        ))}
      </ol>
    </>
  );
}

function getWinner(board) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    return null;
  }
}

// what are better solutions for this?
class Ids {
  static new() {
    const id = `aei${Ids.idCount}`;
    Ids.idCount++;
    return id;
  }
}

Ids.idCount = 0;

export default App;
