import "@fontsource/inter";
import { useState } from "react";
import { usePuzzle } from "./lib/stores/usePuzzle";
import { useApplyTheme } from "./lib/stores/useTheme";
import { LevelSelection } from "./components/LevelSelection";
import { PlayerInfoForm } from "./components/PlayerInfoForm";
import { SlidePuzzle } from "./components/SlidePuzzle";
import { GameUI } from "./components/GameUI";
import { SoundManager } from "./components/SoundManager";
import { Leaderboard } from "./components/Leaderboard";

function App() {
  const { phase } = usePuzzle();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  useApplyTheme();

  if (showLeaderboard) {
    return <Leaderboard onClose={() => setShowLeaderboard(false)} />;
  }

  return (
    <>
      {phase === "menu" && <LevelSelection onShowLeaderboard={() => setShowLeaderboard(true)} />}
      
      {phase === "playerInfo" && <PlayerInfoForm />}
      
      {(phase === "playing" || phase === "completed") && (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-candy-blue/20 via-candy-purple/20 to-candy-pink/20 dark:from-candy-blue/10 dark:via-candy-purple/10 dark:to-candy-pink/10 p-4 relative overflow-hidden transition-all duration-500">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-candy-yellow/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-1/4 right-10 w-40 h-40 bg-candy-pink/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-candy-green/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-10 right-1/3 w-32 h-32 bg-candy-orange/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          <SlidePuzzle />
          <GameUI />
        </div>
      )}
      
      <SoundManager />
    </>
  );
}

export default App;
