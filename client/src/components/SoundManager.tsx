import { useEffect } from "react";
import { useAudio } from "@/lib/stores/useAudio";

export function SoundManager() {
  const { setHitSound, setSuccessSound } = useAudio();
  
  useEffect(() => {
    const hitSound = new Audio("/sounds/hit.mp3");
    const successSound = new Audio("/sounds/success.mp3");
    
    hitSound.volume = 0.3;
    successSound.volume = 0.5;
    
    setHitSound(hitSound);
    setSuccessSound(successSound);
  }, [setHitSound, setSuccessSound]);
  
  return null;
}
