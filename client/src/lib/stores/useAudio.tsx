import { create } from "zustand";

interface AudioState {
  backgroundMusic: HTMLAudioElement | null;
  hitSound: HTMLAudioElement | null;
  successSound: HTMLAudioElement | null;
  isMuted: boolean;
  isMusicPlaying: boolean;
  
  // Setter functions
  setBackgroundMusic: (music: HTMLAudioElement) => void;
  setHitSound: (sound: HTMLAudioElement) => void;
  setSuccessSound: (sound: HTMLAudioElement) => void;
  
  // Control functions
  toggleMute: () => void;
  toggleMusic: () => void;
  playHit: () => void;
  playSuccess: () => void;
}

export const useAudio = create<AudioState>((set, get) => ({
  backgroundMusic: null,
  hitSound: null,
  successSound: null,
  isMuted: true,
  isMusicPlaying: false,
  
  setBackgroundMusic: (music) => set({ backgroundMusic: music }),
  setHitSound: (sound) => set({ hitSound: sound }),
  setSuccessSound: (sound) => set({ successSound: sound }),
  
  toggleMute: () => {
    const { isMuted, backgroundMusic, isMusicPlaying } = get();
    const newMutedState = !isMuted;
    
    set({ isMuted: newMutedState });
    
    if (backgroundMusic && isMusicPlaying) {
      backgroundMusic.muted = newMutedState;
    }
    
    console.log(`Sound ${newMutedState ? 'muted' : 'unmuted'}`);
  },
  
  toggleMusic: () => {
    const { backgroundMusic, isMusicPlaying, isMuted } = get();
    
    if (!backgroundMusic) return;
    
    if (isMusicPlaying) {
      backgroundMusic.pause();
      set({ isMusicPlaying: false });
      console.log("Background music paused");
    } else {
      backgroundMusic.loop = true;
      backgroundMusic.volume = 0.3;
      backgroundMusic.muted = isMuted;
      backgroundMusic.play().catch(error => {
        console.log("Background music play prevented:", error);
      });
      set({ isMusicPlaying: true });
      console.log("Background music playing");
    }
  },
  
  playHit: () => {
    const { hitSound, isMuted } = get();
    if (hitSound) {
      if (isMuted) {
        console.log("Hit sound skipped (muted)");
        return;
      }
      
      const soundClone = hitSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.3;
      soundClone.play().catch(error => {
        console.log("Hit sound play prevented:", error);
      });
    }
  },
  
  playSuccess: () => {
    const { successSound, isMuted } = get();
    if (successSound) {
      if (isMuted) {
        console.log("Success sound skipped (muted)");
        return;
      }
      
      successSound.currentTime = 0;
      successSound.play().catch(error => {
        console.log("Success sound play prevented:", error);
      });
    }
  }
}));
