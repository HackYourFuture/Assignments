'use strict';

// Adapted from: https://spicyyoghurt.com/tutorials/javascript/conways-game-of-life-canvas
// Refactored from ES6 Class syntax to regular functions

const CELL_RADIUS = 5;
const CELL_SIZE = CELL_RADIUS * 2;
const TWO_PI = 2 * Math.PI;

function createCell(x, y) {
  const alive = Math.random() > 0.5;
  return {
    x,
    y,
    alive,
  };
}

function draw(cell, context) {
  context.fillStyle = '#303030';
  context.fillRect(
    cell.x * CELL_SIZE,
    cell.y * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE
  );

  if (cell.alive) {
    context.fillStyle = `rgb(24, 215, 236)`;
    context.beginPath();
    context.arc(
      cell.x * CELL_SIZE + CELL_RADIUS,
      cell.y * CELL_SIZE + CELL_RADIUS,
      CELL_RADIUS,
      0,
      TWO_PI
    );
    context.fill();
  }
}

function createGame(context, numRows, numColumns) {
  const grid = [];

  function createGrid() {
    for (let y = 0; y < numRows; y++) {
      for (let x = 0; x < numColumns; x++) {
        grid.push(createCell(x, y));
      }
    }
  }

  const gridToIndex = (x, y) => x + y * numColumns;

  function isAlive(x, y) {
    // Out-of-border cells are presumed dead
    if (x < 0 || x >= numColumns || y < 0 || y >= numRows) {
      return 0;
    }

    return grid[gridToIndex(x, y)].alive ? 1 : 0;
  }

  // Count number of living neighboring cells
  function countLivingNeighbors(cell) {
    const { x, y } = cell;
    return (
      isAlive(x - 1, y - 1) +
      isAlive(x, y - 1) +
      isAlive(x + 1, y - 1) +
      isAlive(x - 1, y) +
      isAlive(x + 1, y) +
      isAlive(x - 1, y + 1) +
      isAlive(x, y + 1) +
      isAlive(x + 1, y + 1)
    );
  }

  function updateGrid() {
    // Loop over all cells
    grid.forEach((cell) => {
      // Count number of living neighboring cells
      const numAlive = countLivingNeighbors(cell);

      if (numAlive === 2) {
        // Do nothing
        cell.nextAlive = cell.alive;
      } else if (numAlive === 3) {
        // Make alive
        cell.nextAlive = true;
      } else {
        // Make dead
        cell.nextAlive = false;
      }
    });

    // Apply the new state to the cells
    grid.forEach((cell) => {
      cell.alive = cell.nextAlive;
    });
  }

  function renderGrid() {
    // Draw all the game objects
    grid.forEach((cell) => draw(cell, context));
  }

  function gameLoop() {
    // Check the surrounding of each cell
    updateGrid();

    // Render the updated grid
    renderGrid();

    // Schedule the next generation
    setTimeout(() => {
      window.requestAnimationFrame(() => gameLoop());
    }, 200);
  }

  return { createGrid, renderGrid, gameLoop };
}

function main() {
  const numColumns = 75;
  const numRows = 40;

  const canvas = document.getElementById('canvas');
  canvas.height = numRows * CELL_SIZE;
  canvas.width = numColumns * CELL_SIZE;
  const context = canvas.getContext('2d');

  const { createGrid, renderGrid, gameLoop } = createGame(
    context,
    numRows,
    numColumns
  );

  // Create initial grid
  createGrid();

  // Render the initial generation
  renderGrid();

  // Kick-start the evolution
  window.requestAnimationFrame(() => gameLoop());
}

window.onload = main;
