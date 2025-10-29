import { usePuzzle, type Difficulty } from "@/lib/stores/usePuzzle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

export function LevelSelection() {
  const { setDifficulty, startGame } = usePuzzle();
  
  const handleLevelSelect = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
    startGame();
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-monad-blue p-4">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-monad-off-white mb-4">
          Monad Puzzle
        </h1>
        <p className="text-xl text-monad-purple">
          Slide the tiles to complete the Monad artwork
        </p>
      </div>
      
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
                Start Game
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-monad-off-white/60 text-sm">
          Powered by Monad - The Most Performant EVM Layer 1
        </p>
      </div>
    </div>
  );
}
