import { useMemo, useEffect } from "react";
import { usePuzzle } from "@/lib/stores/usePuzzle";

export function SlidePuzzle() {
  const { tiles, difficulty, moveTile, selectedImage, showHints } = usePuzzle();
  
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
  
  const imageUrl = useMemo(() => {
    return `/images/monad-puzzle-${selectedImage}.png`;
  }, [selectedImage]);
  
  useEffect(() => {
    console.log("Puzzle initialized with grid size:", gridSize);
    console.log("Total tiles:", tiles.length);
    console.log("Selected image:", imageUrl);
  }, [gridSize, tiles.length, imageUrl]);
  
  const handleTileClick = (position: number) => {
    console.log("Tile clicked at position:", position);
    moveTile(position);
  };
  
  return (
    <div className="flex items-center justify-center">
      <div 
        className="relative bg-gradient-to-br from-candy-purple/20 to-candy-pink/20 dark:from-candy-purple/30 dark:to-candy-pink/30 rounded-3xl shadow-2xl backdrop-blur-sm border-4 border-candy-purple/40 dark:border-candy-pink/40"
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
          
          const isCorrectPosition = tile.id === tile.position;
          
          return (
            <div
              key={tile.id}
              className={`absolute transition-all duration-300 ease-out ${
                tile.isEmpty 
                  ? "opacity-0 pointer-events-none" 
                  : "cursor-pointer hover:brightness-110 hover:scale-[0.98] active:scale-95"
              }`}
              style={{
                width: `${tileSize}%`,
                height: `${tileSize}%`,
                left: `${currentCol * tileSize}%`,
                top: `${currentRow * tileSize}%`,
                backgroundImage: tile.isEmpty ? "none" : `url(${imageUrl})`,
                backgroundSize: `${gridSize * 100}%`,
                backgroundPosition: `${col * 100}% ${row * 100}%`,
                border: tile.isEmpty ? "none" : showHints && isCorrectPosition 
                  ? "4px solid rgba(107, 207, 127, 1)" 
                  : "3px solid rgba(167, 139, 250, 0.4)",
                borderRadius: "12px",
                boxShadow: showHints && isCorrectPosition 
                  ? "0 0 20px rgba(107, 207, 127, 0.6), inset 0 0 10px rgba(107, 207, 127, 0.2)" 
                  : tile.isEmpty 
                    ? "none"
                    : "0 4px 10px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.1)"
              }}
              onClick={() => handleTileClick(tile.position)}
            >
              {showHints && !tile.isEmpty && !isCorrectPosition && (
                <div className="absolute top-2 right-2 bg-gradient-to-br from-candy-pink to-candy-red text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse-soft">
                  {tile.id + 1}
                </div>
              )}
              {showHints && !tile.isEmpty && isCorrectPosition && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 bg-candy-green rounded-full flex items-center justify-center animate-bounce-slow shadow-lg">
                    <span className="text-white text-xl">✓</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
