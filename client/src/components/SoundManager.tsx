import { useEffect } from "react";
import { useAudio } from "@/lib/stores/useAudio";

export function SoundManager() {
  const { setHitSound, setSuccessSound, setBackgroundMusic } = useAudio();
  
  useEffect(() => {
    const hitSound = new Audio("/sounds/hit.mp3");
    const successSound = new Audio("/sounds/success.mp3");
    const backgroundMusic = new Audio("/sounds/background.mp3");
    
    hitSound.volume = 0.3;
    successSound.volume = 0.5;
    backgroundMusic.volume = 0.3;
    backgroundMusic.loop = true;
    
    setHitSound(hitSound);
    setSuccessSound(successSound);
    setBackgroundMusic(backgroundMusic);
  }, [setHitSound, setSuccessSound, setBackgroundMusic]);
  
  return null;
}
