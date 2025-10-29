import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type Difficulty = "easy" | "medium" | "hard";
export type GamePhase = "menu" | "playing" | "completed";

interface Tile {
  id: number;
  position: number;
  isEmpty: boolean;
}

interface PuzzleState {
  difficulty: Difficulty | null;
  phase: GamePhase;
  tiles: Tile[];
  moves: number;
  startTime: number | null;
  
  setDifficulty: (difficulty: Difficulty) => void;
  startGame: () => void;
  moveTile: (position: number) => void;
  resetGame: () => void;
  backToMenu: () => void;
}

const getGridSize = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case "easy": return 3;
    case "medium": return 4;
    case "hard": return 5;
  }
};

const createTiles = (gridSize: number): Tile[] => {
  const totalTiles = gridSize * gridSize;
  const tiles: Tile[] = [];
  
  for (let i = 0; i < totalTiles; i++) {
    tiles.push({
      id: i,
      position: i,
      isEmpty: i === totalTiles - 1
    });
  }
  
  return tiles;
};

const shuffleTiles = (tiles: Tile[], gridSize: number): Tile[] => {
  const shuffled = [...tiles];
  
  for (let i = 0; i < 1000; i++) {
    const currentEmptyIndex = shuffled.findIndex(t => t.isEmpty);
    const emptyPosition = shuffled[currentEmptyIndex].position;
    
    const validMoves = getValidMoves(emptyPosition, gridSize);
    const randomMovePosition = validMoves[Math.floor(Math.random() * validMoves.length)];
    
    const tileToSwapIndex = shuffled.findIndex(t => t.position === randomMovePosition);
    
    const temp = shuffled[currentEmptyIndex].position;
    shuffled[currentEmptyIndex].position = shuffled[tileToSwapIndex].position;
    shuffled[tileToSwapIndex].position = temp;
  }
  
  if (isSolved(shuffled)) {
    console.warn("Puzzle is still solved after shuffling - shuffling again");
    return shuffleTiles(tiles, gridSize);
  }
  
  return shuffled;
};

const getValidMoves = (emptyPosition: number, gridSize: number): number[] => {
  const validMoves: number[] = [];
  const row = Math.floor(emptyPosition / gridSize);
  const col = emptyPosition % gridSize;
  
  if (row > 0) validMoves.push(emptyPosition - gridSize);
  if (row < gridSize - 1) validMoves.push(emptyPosition + gridSize);
  if (col > 0) validMoves.push(emptyPosition - 1);
  if (col < gridSize - 1) validMoves.push(emptyPosition + 1);
  
  return validMoves;
};

const isSolved = (tiles: Tile[]): boolean => {
  return tiles.every(tile => tile.id === tile.position);
};

export const usePuzzle = create<PuzzleState>()(
  subscribeWithSelector((set, get) => ({
    difficulty: null,
    phase: "menu",
    tiles: [],
    moves: 0,
    startTime: null,
    
    setDifficulty: (difficulty) => {
      set({ difficulty });
    },
    
    startGame: () => {
      const { difficulty } = get();
      if (!difficulty) return;
      
      const gridSize = getGridSize(difficulty);
      const tiles = createTiles(gridSize);
      const shuffledTiles = shuffleTiles(tiles, gridSize);
      
      set({
        phase: "playing",
        tiles: shuffledTiles,
        moves: 0,
        startTime: Date.now()
      });
    },
    
    moveTile: (position) => {
      const { tiles, difficulty, phase } = get();
      if (phase !== "playing" || !difficulty) return;
      
      const gridSize = getGridSize(difficulty);
      const clickedTileIndex = tiles.findIndex(t => t.position === position);
      const emptyTileIndex = tiles.findIndex(t => t.isEmpty);
      
      const validMoves = getValidMoves(tiles[emptyTileIndex].position, gridSize);
      
      if (!validMoves.includes(position)) return;
      
      const newTiles = [...tiles];
      const temp = newTiles[clickedTileIndex].position;
      newTiles[clickedTileIndex].position = newTiles[emptyTileIndex].position;
      newTiles[emptyTileIndex].position = temp;
      
      const newMoves = get().moves + 1;
      
      set({
        tiles: newTiles,
        moves: newMoves
      });
      
      if (isSolved(newTiles)) {
        set({ phase: "completed" });
      }
    },
    
    resetGame: () => {
      get().startGame();
    },
    
    backToMenu: () => {
      set({
        phase: "menu",
        difficulty: null,
        tiles: [],
        moves: 0,
        startTime: null
      });
    }
  }))
);
