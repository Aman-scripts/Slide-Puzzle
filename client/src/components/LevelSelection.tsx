import { usePuzzle, type Difficulty, type PuzzleImage } from "@/lib/stores/usePuzzle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const levels: { difficulty: Difficulty; title: string; description: string; gridSize: string }[] = [
  {
    difficulty: "easy",
    title: "Easy",
    description: "Perfect for beginners",
    gridSize: "3x3 Grid"
  },
  {
    difficulty: "medium",
    title: "Medium",
    description: "A moderate challenge",
    gridSize: "4x4 Grid"
  },
  {
    difficulty: "hard",
    title: "Hard",
    description: "For puzzle masters",
    gridSize: "5x5 Grid"
  }
];

const puzzleImages: { id: PuzzleImage; name: string; preview: string }[] = [
  { id: 1, name: "Monad Network", preview: "/images/monad-puzzle.png" },
  { id: 2, name: "Cosmic Purple", preview: "/images/monad-puzzle-2.png" },
  { id: 3, name: "Hexagonal Grid", preview: "/images/monad-puzzle-3.png" }
];

export function LevelSelection() {
  const { setDifficulty, startGame, selectedImage, setSelectedImage } = usePuzzle();
  const [selectedDifficulty, setSelectedDifficultyState] = useState<Difficulty | null>(null);
  
  const handleLevelSelect = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
    setSelectedDifficultyState(difficulty);
  };
  
  const handleStartGame = () => {
    if (selectedDifficulty) {
      setDifficulty(selectedDifficulty);
      startGame();
    }
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-monad-blue p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-monad-off-white mb-4">
          Monad Puzzle
        </h1>
        <p className="text-xl text-monad-purple">
          Slide the tiles to complete the Monad artwork
        </p>
      </div>
      
      {!selectedDifficulty ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          {levels.map((level) => (
            <Card 
              key={level.difficulty}
              className="bg-monad-off-white/10 border-monad-purple/30 hover:border-monad-purple transition-all duration-300 cursor-pointer backdrop-blur-sm"
              onClick={() => handleLevelSelect(level.difficulty)}
            >
              <CardHeader>
                <CardTitle className="text-3xl text-monad-off-white">
                  {level.title}
                </CardTitle>
                <CardDescription className="text-monad-purple text-lg">
                  {level.gridSize}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-monad-off-white/80 mb-4">
                  {level.description}
                </p>
                <Button 
                  className="w-full bg-monad-purple hover:bg-monad-purple/80 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLevelSelect(level.difficulty);
                  }}
                >
                  Select Level
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl w-full">
          <Button
            onClick={() => setSelectedDifficultyState(null)}
            variant="outline"
            className="mb-6 bg-monad-off-white/10 border-monad-purple/30 text-monad-off-white hover:bg-monad-purple/20"
          >
            ← Back to Levels
          </Button>
          
          <h2 className="text-3xl font-bold text-monad-off-white mb-6 text-center">
            Choose Your Puzzle Image
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {puzzleImages.map((image) => (
              <Card
                key={image.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedImage === image.id
                    ? "bg-monad-purple/30 border-monad-purple border-2"
                    : "bg-monad-off-white/10 border-monad-purple/30 hover:border-monad-purple"
                }`}
                onClick={() => setSelectedImage(image.id)}
              >
                <CardHeader>
                  <CardTitle className="text-xl text-monad-off-white text-center">
                    {image.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square w-full rounded-lg overflow-hidden border-2 border-monad-purple/20">
                    <img 
                      src={image.preview} 
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button
            onClick={handleStartGame}
            className="w-full bg-monad-purple hover:bg-monad-purple/80 text-white text-xl py-6"
          >
            Start Game
          </Button>
        </div>
      )}
      
      <div className="mt-12 text-center">
        <p className="text-monad-off-white/60 text-sm">
          Powered by Monad - The Most Performant EVM Layer 1
        </p>
      </div>
    </div>
  );
}
