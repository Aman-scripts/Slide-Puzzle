import { usePuzzle, type Difficulty, type PuzzleImage } from "@/lib/stores/usePuzzle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Sparkles, Star, Zap } from "lucide-react";

const levels: { 
  difficulty: Difficulty; 
  title: string; 
  description: string; 
  gridSize: string; 
  icon: any; 
  bgColor: string;
  textColor: string;
  hoverBorder: string;
  buttonBg: string;
}[] = [
  {
    difficulty: "easy",
    title: "Easy",
    description: "Perfect for beginners",
    gridSize: "3x3 Grid",
    icon: Star,
    bgColor: "bg-candy-green/20",
    textColor: "text-candy-green",
    hoverBorder: "hover:border-candy-green",
    buttonBg: "bg-candy-green hover:bg-candy-green/80"
  },
  {
    difficulty: "medium",
    title: "Medium",
    description: "A moderate challenge",
    gridSize: "4x4 Grid",
    icon: Sparkles,
    bgColor: "bg-candy-orange/20",
    textColor: "text-candy-orange",
    hoverBorder: "hover:border-candy-orange",
    buttonBg: "bg-candy-orange hover:bg-candy-orange/80"
  },
  {
    difficulty: "hard",
    title: "Hard",
    description: "For puzzle masters",
    gridSize: "5x5 Grid",
    icon: Zap,
    bgColor: "bg-candy-pink/20",
    textColor: "text-candy-pink",
    hoverBorder: "hover:border-candy-pink",
    buttonBg: "bg-candy-pink hover:bg-candy-pink/80"
  }
];

const puzzleImages: { id: PuzzleImage; name: string; preview: string }[] = [
  { id: 1, name: "Monad Network", preview: "/images/monad-puzzle-1.png" },
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-candy-pink/20 via-candy-purple/20 to-candy-blue/20 dark:from-candy-pink/10 dark:via-candy-purple/10 dark:to-candy-blue/10 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-candy-yellow/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-candy-pink/30 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-candy-blue/30 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-candy-green/30 rounded-full blur-xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="text-center mb-8 relative z-10 animate-in fade-in slide-in-from-top duration-700">
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-candy-pink via-candy-orange to-candy-purple bg-clip-text text-transparent mb-4 drop-shadow-lg">
          Slide Puzzle
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-candy-purple dark:text-candy-blue">
          Slide the tiles to complete the puzzle
        </p>
      </div>
      
      {!selectedDifficulty ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full relative z-10">
          {levels.map((level, index) => {
            const Icon = level.icon;
            return (
              <Card 
                key={level.difficulty}
                className={`group bg-card/95 backdrop-blur-lg border-2 ${level.hoverBorder} transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl animate-in fade-in slide-in-from-bottom`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => handleLevelSelect(level.difficulty)}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto mb-4 w-20 h-20 rounded-full ${level.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-10 h-10 ${level.textColor}`} />
                  </div>
                  <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-candy-pink to-candy-purple bg-clip-text text-transparent">
                    {level.title}
                  </CardTitle>
                  <CardDescription className={`${level.textColor} text-lg font-semibold`}>
                    {level.gridSize}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center mb-4">
                    {level.description}
                  </p>
                  <Button 
                    className={`w-full ${level.buttonBg} text-white font-bold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLevelSelect(level.difficulty);
                    }}
                  >
                    Select Level
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="max-w-4xl w-full relative z-10 animate-in fade-in slide-in-from-bottom duration-500">
          <Button
            onClick={() => setSelectedDifficultyState(null)}
            variant="outline"
            className="mb-6 bg-card/95 backdrop-blur-lg border-candy-purple hover:bg-candy-purple/20 text-foreground font-semibold"
          >
            ← Back to Levels
          </Button>
          
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-candy-orange via-candy-yellow to-candy-green bg-clip-text text-transparent mb-6 text-center">
            Choose Your Puzzle Image
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {puzzleImages.map((image, index) => (
              <Card
                key={image.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom ${
                  selectedImage === image.id
                    ? "bg-candy-purple/30 border-candy-purple border-4 shadow-2xl shadow-candy-purple/50"
                    : "bg-card/95 backdrop-blur-lg border-2 hover:border-candy-blue"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => setSelectedImage(image.id)}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-center bg-gradient-to-r from-candy-pink to-candy-blue bg-clip-text text-transparent">
                    {image.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`aspect-square w-full rounded-lg overflow-hidden border-4 transition-all duration-300 ${
                    selectedImage === image.id 
                      ? "border-candy-purple shadow-lg shadow-candy-purple/30" 
                      : "border-candy-blue/20"
                  }`}>
                    <img 
                      src={image.preview} 
                      alt={image.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button
            onClick={handleStartGame}
            className="w-full bg-gradient-to-r from-candy-pink via-candy-orange to-candy-purple hover:opacity-90 text-white text-xl md:text-2xl font-bold py-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="w-6 h-6 mr-2" />
            Start Game
            <Sparkles className="w-6 h-6 ml-2" />
          </Button>
        </div>
      )}
      
      <div className="mt-12 text-center relative z-10 animate-in fade-in duration-1000" style={{ animationDelay: '500ms' }}>
        <p className="text-muted-foreground text-sm">
          Powered by Monad - The Most Performant EVM Layer 1
        </p>
      </div>
    </div>
  );
}
