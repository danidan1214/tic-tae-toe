export const TURNS = {
  X: '❌',
  O: '⚪'
};

export const WINNER_COMBOS = [];

// Generar filas
for (let i = 0; i < 3; i++) {
  WINNER_COMBOS.push([i * 3, i * 3 + 1, i * 3 + 2]);
}

// Generar columnas
for (let i = 0; i < 3; i++) {
  WINNER_COMBOS.push([i, i + 3, i + 6]);
}

// Generar diagonales
WINNER_COMBOS.push([0, 4, 8], [2, 4, 6]);