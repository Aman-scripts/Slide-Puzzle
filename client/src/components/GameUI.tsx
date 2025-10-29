import { useEffect, useState } from "react";
import { usePuzzle } from "@/lib/stores/usePuzzle";
import { useAudio } from "@/lib/stores/useAudio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Confetti from "react-confetti";
import { Timer, RotateCcw, Home, Volume2, VolumeX, Lightbulb, Music } from "lucide-react";

export function GameUI() {
  const { moves, startTime, phase, resetGame, backToMenu, difficulty, showHints, toggleHints } = usePuzzle();
  const { isMuted, toggleMute, playSuccess, isMusicPlaying, toggleMusic } = useAudio();
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
  
  return (
    <>
      {phase === "completed" && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          colors={["#836EF9", "#200052", "#A0055D", "#FBFAF9"]}
        />
      )}
      
      <div className="fixed top-4 left-4 right-4 flex justify-between items-start gap-4 pointer-events-none z-10">
        <Card className="bg-monad-off-white/95 backdrop-blur-sm border-monad-purple/30 pointer-events-auto">
          <CardContent className="p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-monad-blue font-semibold">
                <Timer className="w-5 h-5" />
                <span>{formatTime(elapsedTime)}</span>
              </div>
              <div className="text-monad-blue font-semibold">
                Moves: {moves}
              </div>
              <div className="text-monad-purple text-sm">
                {getDifficultyLabel()}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex gap-2 pointer-events-auto">
          <Button
            onClick={toggleHints}
            variant="outline"
            size="icon"
            className={`${
              showHints 
                ? "bg-monad-purple text-white border-monad-purple" 
                : "bg-monad-off-white/95 hover:bg-monad-off-white border-monad-purple/30 text-monad-blue"
            }`}
            title="Toggle hints"
          >
            <Lightbulb className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={toggleMusic}
            variant="outline"
            size="icon"
            className={`${
              isMusicPlaying
                ? "bg-monad-purple text-white border-monad-purple"
                : "bg-monad-off-white/95 hover:bg-monad-off-white border-monad-purple/30 text-monad-blue"
            }`}
            title="Toggle background music"
          >
            <Music className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={toggleMute}
            variant="outline"
            size="icon"
            className="bg-monad-off-white/95 hover:bg-monad-off-white border-monad-purple/30"
            title="Toggle sound"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-monad-blue" />
            ) : (
              <Volume2 className="w-5 h-5 text-monad-blue" />
            )}
          </Button>
          
          <Button
            onClick={resetGame}
            variant="outline"
            size="icon"
            className="bg-monad-off-white/95 hover:bg-monad-off-white border-monad-purple/30"
            title="Restart puzzle"
          >
            <RotateCcw className="w-5 h-5 text-monad-blue" />
          </Button>
          
          <Button
            onClick={backToMenu}
            variant="outline"
            size="icon"
            className="bg-monad-off-white/95 hover:bg-monad-off-white border-monad-purple/30"
            title="Back to menu"
          >
            <Home className="w-5 h-5 text-monad-blue" />
          </Button>
        </div>
      </div>
      
      {phase === "completed" && (
        <div className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none">
          <Card className="bg-monad-off-white/95 backdrop-blur-sm border-monad-purple shadow-2xl pointer-events-auto">
            <CardContent className="p-8 text-center">
              <h2 className="text-4xl font-bold text-monad-blue mb-4">
                Puzzle Completed! 🎉
              </h2>
              <div className="text-2xl text-monad-purple mb-2">
                Time: {formatTime(elapsedTime)}
              </div>
              <div className="text-xl text-monad-blue mb-6">
                Moves: {moves}
              </div>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={resetGame}
                  className="bg-monad-purple hover:bg-monad-purple/80 text-white"
                >
                  Play Again
                </Button>
                <Button
                  onClick={backToMenu}
                  variant="outline"
                  className="border-monad-purple text-monad-blue hover:bg-monad-purple/10"
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
