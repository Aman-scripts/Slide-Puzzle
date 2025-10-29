import "@fontsource/inter";
import { usePuzzle } from "./lib/stores/usePuzzle";
import { LevelSelection } from "./components/LevelSelection";
import { SlidePuzzle } from "./components/SlidePuzzle";
import { GameUI } from "./components/GameUI";
import { SoundManager } from "./components/SoundManager";

function App() {
  const { phase } = usePuzzle();

  return (
    <>
      {phase === "menu" && <LevelSelection />}
      
      {(phase === "playing" || phase === "completed") && (
        <div className="min-h-screen w-full flex items-center justify-center bg-monad-blue p-4">
          <SlidePuzzle />
          <GameUI />
        </div>
      )}
      
      <SoundManager />
    </>
  );
}

export default App;
