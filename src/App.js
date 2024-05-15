import React, {useState} from 'react';

function Square({value, onSquareClick}){
  return  (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  let status;
  let hideReset = true;
  const [player1, setPlayer1] = useState('X');
  const changePlayer1 = event => {
    checkSquares(player1,event.target.value);
    if (playerTurn !== player1) setPlayer1(event.target.value);
    else {
      setPlayer1(event.target.value);
      setPlayerTurn(event.target.value);
    }
  }
  const [player2, setPlayer2] = useState('O');
  const changePlayer2 = event => {
    checkSquares(player2,event.target.value);
    if (playerTurn !== player2) setPlayer2(event.target.value);
    else {
      setPlayer2(event.target.value); 
      setPlayerTurn(event.target.value);
    }
  }
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [playerTurn, setPlayerTurn] = useState(player1);
  const winner = calculateWinner(squares);
  if (winner){
    status = "Winner is " + winner +"!";
    hideReset = false;
  }
  else {
    status = "Players turn: " + playerTurn;
    hideReset = true;
  }
    
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = playerTurn;
    setSquares(nextSquares);
    if (playerTurn === player1) setPlayerTurn(player2);
    else setPlayerTurn(player1);
  }

  function checkSquares(oldPlayer, newPlayer){
    const nextSquares = squares.slice();
    for (let i = 0; i < squares.length; i++){
      if (nextSquares[i] === oldPlayer) nextSquares[i] = newPlayer;
    }
    setSquares(nextSquares);
  }

  function calculateWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function refreshPage(){
    window.location.reload();
  }

  return (
    <div >
    <div className='board'>
      
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        {/* <div><input className="square" content={newPlayer2} onChange={() => handlePlayer(2)}></input></div> */}
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
      
    </div>
    <div>
      <div className='status'>{status}</div>
      <br/>
      <form>
        <lable>
          Player1: 
          <input 
            className="input-box" 
            type="text" 
            value={player1} 
            onChange={changePlayer1}
          >
          </input>
        </lable>
      </form>
      <form>
        <lable>
          Player2: 
          <input 
            className="input-box" 
            type="text" 
            value={player2} 
            onChange={changePlayer2}
          >
          </input>
        </lable>
      </form>
      <br/>
      <button hidden={hideReset} onClick={() => refreshPage()}>Play again!</button>
    </div>
    </div>
  );
}
