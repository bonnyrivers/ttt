import { useState, React } from 'react';
import './App.css';

function Square({value, onClick, index}) {
  return <button className="square" onClick={() => onClick(index)}>{value}</button>
}

function ShowResult({winner, isXNext}) {
  if (winner) {
    return <div>winner winner chicken dinner!</div>
  } else if (winner === false) {
    return <div>Cat game :(</div>
  }

  if (isXNext) {
    return <div>X's turn</div>
  } else {
    return <div>O's turn</div>
  }
} 


function App() {
  // Create units for each of the squares with an array of len=9
  const [squares, setSquares] = useState(Array(9).fill(null))
  // Create state for who's turn it is
  const [isXNext, setIsXNext] = useState(false);
  // State for if the game is over / if there is a winner
  // null if the game is still happening
  const [winner, setWinner] = useState(null);

  function handleClick({i}) {
    const currentSquares = squares.slice(); // get copy of current square state

    if (currentSquares[i]) {
      // if the square already has a value, then nothing should be done
      return;
    }
    console.log('index: ', i)

    if (isXNext) {
      currentSquares[i] = "X"
    } else {
      currentSquares[i] = "O"
    }
    setIsXNext(!isXNext)
    setSquares(currentSquares)
    // state is updated at this point
    calculateWinner({sqs: currentSquares})
  }

  function calculateWinner({sqs}) {
    console.log('CALCULATING WINNER')
  
      // All winning combinations
    const winningLines = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], //columns
      [0,4,8], [2,4,6] //diagonals
    ];
    winningLines.forEach(line => {
      const [x, y, z] = line;

      // if all the sqauares in the line are true, and all have the same value, then we have a winner
      if (sqs[x] && sqs[y] && sqs[z] && sqs[x] === sqs[y] && sqs[y] === sqs[z]) {
        console.log('we have a winner <3')
         setWinner(true);
         return;
      }
    })

    if (!squares.some((sq) => sq === null)) {
      console.log('No moves left')
      setWinner(false);
    }
  }

  function restartGame() {
    const freshBoard = Array(9).fill(null);
    setSquares(freshBoard);
    setWinner(null)
    setIsXNext(true)
  }
 

  return (
    <>
      <div className="board">
        <div className="row">
          <Square onClick={() => handleClick({i: 0})} value={squares[0]} index="0" />
          <Square onClick={() => handleClick({i: 1})} value={squares[1]} index="1"/>
          <Square onClick={() => handleClick({i: 2})} value={squares[2]} index="2"/>
        </div>
        <div className="row">
          <Square onClick={() => handleClick({i: 3})} value={squares[3]} index="3"/>
          <Square onClick={() => handleClick({i: 4})} value={squares[4]} index="4"/>
          <Square onClick={() => handleClick({i: 5})} value={squares[5]}index="5" />
        </div>
        <div className="row">
          <Square onClick={() => handleClick({i: 6})} value={squares[6]}index="6" />
          <Square onClick={() => handleClick({i: 7})} value={squares[7]} index="7"/>
          <Square onClick={() => handleClick({i: 8})} value={squares[8]} index="8"/>
        </div>
      </div>

      <div>
        <button onClick={() => restartGame()}>Restart</button>
      </div>

      <div>
        <ShowResult winner={winner} isXNext={isXNext} />
      </div>
    </>
  );
}

export default App;
