import { useMemo, useEffect } from "react";
import { usePuzzle } from "@/lib/stores/usePuzzle";

export function SlidePuzzle() {
  const { tiles, difficulty, moveTile } = usePuzzle();
  
  const gridSize = useMemo(() => {
    switch (difficulty) {
      case "easy": return 3;
      case "medium": return 4;
      case "hard": return 5;
      default: return 3;
    }
  }, [difficulty]);
  
  const tileSize = useMemo(() => {
    return 100 / gridSize;
  }, [gridSize]);
  
  useEffect(() => {
    console.log("Puzzle initialized with grid size:", gridSize);
    console.log("Total tiles:", tiles.length);
  }, [gridSize, tiles.length]);
  
  const handleTileClick = (position: number) => {
    console.log("Tile clicked at position:", position);
    moveTile(position);
  };
  
  return (
    <div className="flex items-center justify-center">
      <div 
        className="relative bg-monad-black/30 rounded-lg shadow-2xl"
        style={{
          width: "min(80vw, 80vh, 600px)",
          height: "min(80vw, 80vh, 600px)",
        }}
      >
        {tiles.map((tile) => {
          const row = Math.floor(tile.id / gridSize);
          const col = tile.id % gridSize;
          
          const currentRow = Math.floor(tile.position / gridSize);
          const currentCol = tile.position % gridSize;
          
          return (
            <div
              key={tile.id}
              className={`absolute transition-all duration-300 ease-out ${
                tile.isEmpty 
                  ? "opacity-0 pointer-events-none" 
                  : "cursor-pointer hover:brightness-110 hover:scale-[0.98]"
              }`}
              style={{
                width: `${tileSize}%`,
                height: `${tileSize}%`,
                left: `${currentCol * tileSize}%`,
                top: `${currentRow * tileSize}%`,
                backgroundImage: tile.isEmpty ? "none" : "url(/images/monad-puzzle.png)",
                backgroundSize: `${gridSize * 100}%`,
                backgroundPosition: `${col * 100}% ${row * 100}%`,
                border: tile.isEmpty ? "none" : "2px solid rgba(131, 110, 249, 0.3)",
                borderRadius: "4px",
              }}
              onClick={() => handleTileClick(tile.position)}
            />
          );
        })}
      </div>
    </div>
  );
}
