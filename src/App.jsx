import './App.css';
import { useState } from 'react';
import { Square } from './components/Square.jsx';
import { TURNS } from './constants.js';
import { checkWinnerFrom, checkEndGame } from './logic/board.js';
import { WinnerModal } from './components/WinnerModal.jsx';
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js';
import { launchWinConfetti, launchTieConfetti } from './utils/confetti.js';
import { ResetButton } from './components/ResetButton.jsx';
import { TurnDisplay } from './components/TurnDisplay.jsx';
import { Board } from './components/Board.jsx';

function App() {
  // Estado inicial del tablero obtenido de localStorage o array vacío
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });

  // Estado inicial del turno obtenido de localStorage o turno X
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ? turnFromStorage : TURNS.X;
  });

  const [winner, setWinner] = useState(null); // null es que no hay ganador y false es que hay empate

  // Función para reiniciar el juego y limpiar localStorage
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setTurn(TURNS.X);
    resetGameStorage();
  };

  // Función para actualizar el tablero al hacer clic en una casilla
  const updateBoard = (index) => {
    if (board[index] || winner) return; // Evitar sobrescribir casillas ocupadas o jugar si ya hay ganador

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    saveGameToStorage({ board: newBoard, turn: newTurn }); // Guardar partida en localStorage
    setTurn(newTurn);

    const newWinner = checkWinnerFrom(newBoard); // Verificar ganador
    if (newWinner) {
      launchWinConfetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) { // Verificar empate
      launchTieConfetti();
      setWinner(false);
    }
  };

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <ResetButton resetGame={resetGame} />
      <Board board={board} updateBoard={updateBoard} />
      <TurnDisplay turn={turn} />
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
