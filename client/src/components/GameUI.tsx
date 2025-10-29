import { useEffect, useState } from "react";
import { usePuzzle } from "@/lib/stores/usePuzzle";
import { useAudio } from "@/lib/stores/useAudio";
import { useTheme } from "@/lib/stores/useTheme";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Confetti from "react-confetti";
import { Timer, RotateCcw, Home, Volume2, VolumeX, Lightbulb, Music, Sun, Moon, Sparkles, Trophy } from "lucide-react";

export function GameUI() {
  const { moves, startTime, phase, resetGame, backToMenu, difficulty, showHints, toggleHints } = usePuzzle();
  const { isMuted, toggleMute, playSuccess, isMusicPlaying, toggleMusic } = useAudio();
  const { theme, toggleTheme } = useTheme();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hasPlayedSuccess, setHasPlayedSuccess] = useState(false);
  
  useEffect(() => {
    if (phase === "completed" && !hasPlayedSuccess) {
      playSuccess();
      setHasPlayedSuccess(true);
    }
    
    if (phase === "playing") {
      setHasPlayedSuccess(false);
    }
  }, [phase, playSuccess, hasPlayedSuccess]);
  
  useEffect(() => {
    if (phase !== "playing" || !startTime) return;
    
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [phase, startTime]);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  
  const getDifficultyLabel = () => {
    switch (difficulty) {
      case "easy": return "Easy (3x3)";
      case "medium": return "Medium (4x4)";
      case "hard": return "Hard (5x5)";
      default: return "";
    }
  };
  
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy": return "text-candy-green";
      case "medium": return "text-candy-orange";
      case "hard": return "text-candy-pink";
      default: return "text-candy-blue";
    }
  };
  
  return (
    <>
      {phase === "completed" && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          colors={["#FF69B4", "#FF8C42", "#FFD93D", "#6BCF7F", "#4ECDC4", "#A78BFA"]}
        />
      )}
      
      <div className="fixed top-4 left-4 right-4 flex justify-between items-start gap-4 pointer-events-none z-10">
        <Card className="bg-card/95 backdrop-blur-lg border-2 border-candy-purple/40 pointer-events-auto shadow-xl hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-left">
          <CardContent className="p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-candy-blue dark:text-candy-purple font-bold text-lg">
                <Timer className="w-5 h-5" />
                <span>{formatTime(elapsedTime)}</span>
              </div>
              <div className="flex items-center gap-2 text-candy-pink dark:text-candy-orange font-bold text-lg">
                <Sparkles className="w-5 h-5" />
                <span>Moves: {moves}</span>
              </div>
              <div className={`${getDifficultyColor()} text-sm font-semibold`}>
                {getDifficultyLabel()}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex gap-2 pointer-events-auto animate-in fade-in slide-in-from-right">
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="icon"
            className="bg-card/95 backdrop-blur-lg hover:bg-candy-yellow/20 border-2 border-candy-yellow/40 hover:border-candy-yellow transition-all duration-300 hover:scale-110 shadow-lg"
            title="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-candy-purple" />
            ) : (
              <Sun className="w-5 h-5 text-candy-yellow" />
            )}
          </Button>
          
          <Button
            onClick={toggleHints}
            variant="outline"
            size="icon"
            className={`backdrop-blur-lg border-2 transition-all duration-300 hover:scale-110 shadow-lg ${
              showHints 
                ? "bg-candy-green text-white border-candy-green shadow-candy-green/50" 
                : "bg-card/95 hover:bg-candy-green/20 border-candy-green/40 hover:border-candy-green text-candy-green"
            }`}
            title="Toggle hints"
          >
            <Lightbulb className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={toggleMusic}
            variant="outline"
            size="icon"
            className={`backdrop-blur-lg border-2 transition-all duration-300 hover:scale-110 shadow-lg ${
              isMusicPlaying
                ? "bg-candy-purple text-white border-candy-purple shadow-candy-purple/50"
                : "bg-card/95 hover:bg-candy-purple/20 border-candy-purple/40 hover:border-candy-purple text-candy-purple"
            }`}
            title="Toggle background music"
          >
            <Music className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={toggleMute}
            variant="outline"
            size="icon"
            className="bg-card/95 backdrop-blur-lg hover:bg-candy-blue/20 border-2 border-candy-blue/40 hover:border-candy-blue transition-all duration-300 hover:scale-110 shadow-lg"
            title="Toggle sound"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-candy-red" />
            ) : (
              <Volume2 className="w-5 h-5 text-candy-blue" />
            )}
          </Button>
          
          <Button
            onClick={resetGame}
            variant="outline"
            size="icon"
            className="bg-card/95 backdrop-blur-lg hover:bg-candy-orange/20 border-2 border-candy-orange/40 hover:border-candy-orange transition-all duration-300 hover:scale-110 shadow-lg"
            title="Restart puzzle"
          >
            <RotateCcw className="w-5 h-5 text-candy-orange" />
          </Button>
          
          <Button
            onClick={backToMenu}
            variant="outline"
            size="icon"
            className="bg-card/95 backdrop-blur-lg hover:bg-candy-pink/20 border-2 border-candy-pink/40 hover:border-candy-pink transition-all duration-300 hover:scale-110 shadow-lg"
            title="Back to menu"
          >
            <Home className="w-5 h-5 text-candy-pink" />
          </Button>
        </div>
      </div>
      
      {phase === "completed" && (
        <div className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none animate-in fade-in zoom-in duration-500">
          <Card className="bg-card/95 backdrop-blur-lg border-4 border-candy-purple shadow-2xl shadow-candy-purple/50 pointer-events-auto max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <Trophy className="w-24 h-24 text-candy-yellow animate-bounce-slow" />
                  <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-candy-pink animate-pulse" />
                  <Sparkles className="absolute -bottom-2 -left-2 w-8 h-8 text-candy-blue animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-candy-pink via-candy-yellow to-candy-green bg-clip-text text-transparent mb-6 animate-pulse-soft">
                Amazing! 🎉
              </h2>
              
              <div className="bg-gradient-to-r from-candy-purple/20 to-candy-pink/20 rounded-2xl p-4 mb-6 border-2 border-candy-purple/30">
                <div className="text-2xl font-bold text-candy-blue dark:text-candy-purple mb-2 flex items-center justify-center gap-2">
                  <Timer className="w-6 h-6" />
                  {formatTime(elapsedTime)}
                </div>
                <div className="text-xl font-semibold text-candy-pink dark:text-candy-orange flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {moves} Moves
                </div>
              </div>
              
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-candy-green to-candy-blue hover:opacity-90 text-white font-bold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Play Again
                </Button>
                <Button
                  onClick={backToMenu}
                  variant="outline"
                  className="border-2 border-candy-purple text-candy-purple hover:bg-candy-purple/20 font-bold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Change Level
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
