import { Square } from './Square.jsx';
export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;
  const winnerText = winner === false ? 'Empate' : 'Ganó';
  return (
    <div className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>
        <header className='win'>
          {winner && <Square isSelected={true}>{winner}</Square>}
        </header>
        <footer>
          <button onClick={resetGame}>Reiniciar</button>
        </footer>
      </div>
    </div>
  );
}
