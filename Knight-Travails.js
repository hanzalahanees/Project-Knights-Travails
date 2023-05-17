// Define the size of the game board
const boardSize = 8;

// Define the knight's possible moves
const knightMoves = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2]
];

// Function to check if a position is valid (within the board)
function isValidPosition(x, y) {
  return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
}

// Function to find the shortest path using breadth-first search
function findShortestPath(start, end) {
  const queue = [start];
  const visited = new Set();
  const parentMap = new Map();
  visited.add(start.toString());

  while (queue.length > 0) {
    const current = queue.shift();
    const [x, y] = current;

    if (x === end[0] && y === end[1]) {
      // Path found, reconstruct and return it
      const path = [];
      let node = current;
      while (node) {
        path.unshift(node);
        node = parentMap.get(node.toString());
      }
      return path;
    }

    for (const move of knightMoves) {
      const newX = x + move[0];
      const newY = y + move[1];
      const newPosition = [newX, newY];

      if (isValidPosition(newX, newY) && !visited.has(newPosition.toString())) {
        queue.push(newPosition);
        visited.add(newPosition.toString());
        parentMap.set(newPosition.toString(), current);
      }
    }
  }

  // No path found
  return null;
}

// Function to print the path
function printPath(path) {
  if (path === null) {
    console.log("No path found.");
    return;
  }

  console.log(`The shortest path was ${path.length - 1} moves!`);
  console.log("You made it in 3 moves!  Here's your path:");
  for (const position of path) {
    console.log(position.join(", "));
  }
}

// Test the function
const start = [3, 3];
const end = [4, 3];
const path = findShortestPath(start, end);
printPath(path);