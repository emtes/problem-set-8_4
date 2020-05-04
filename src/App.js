import React, { useState } from 'react';

function App() {
  return (
    <main>
      <NoughtsCrosses />
    </main>
  );
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
      <h1 id="title">Noughts and Crosses</h1>
      <ul className="actions">
        <li>
          <button className="action" onClick={newGame}>
            New Game
          </button>
        </li>
      </ul>
      <p className="status">
        Next Player:
        {isXNext ? <strong> X</strong> : <strong> O</strong>}
      </p>
      {winner && (
        <p className="status">
          The winner is
          {winner === 'X' ? <strong> X</strong> : <strong> O</strong>}
          !
        </p>
      )}
      <Board board={board} handlePlay={handlePlay} />
      <History history={history} game={game} setGame={setGame} />
    </>
  );
}

function Board({ board, handlePlay }) {
  return (
    <div id="board">
      {board.map((slot, i) => (
        <Cell key={Ids.new()} play={() => handlePlay(i)} value={board[i]} />
      ))}
    </div>
  );
}

function Cell({ value, play }) {
  return (
    <button onClick={play} className="game-cell">
      {value}
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
    <div>
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
            {i > 0 ? (
              <p>
                Go to move
                <strong>
                  {' '}
                  {i}
                </strong>
              </p>
            ) : (
              <p>
                Go to
                {' '}
                <strong>START</strong>
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
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
  }
  return null;
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
