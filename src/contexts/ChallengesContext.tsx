import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from "../../challenges.json";

// typing variables
interface challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface challengeContextData {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChallengeProviderProps {
  children: ReactNode;
}

// exporting
export const ChallengesContext = createContext({} as challengeContextData);

export function ChallengesProvider({ children }: ChallengeProviderProps) {
  
  // states
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengeCompleted, setChallengeCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  
  // constants
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
  
  // effects
  useEffect(() => {
    Notification.requestPermission();
  }, [])
  
  // functions
  function levelUp() {
    setLevel(level + 1);
  }
  
  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    
    setActiveChallenge(challenge);
    
    new Audio("/notification.mp3").play();
    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🏅🎉", {
        body: `Valendo ${challenge.amount} xp!`
      });
    }
  }
  
  function resetChallenge() {
    setActiveChallenge(null);
  }
  
  function completeChallenge() {
    if (!activeChallenge) return;
    
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;
    
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengeCompleted(challengeCompleted + 1);
  }
  
  //...
  return (
    <ChallengesContext.Provider value={
      {
        level,
        currentExperience,
        challengeCompleted,
        experienceToNextLevel,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge
      }
    }>
      { children }
    </ChallengesContext.Provider>
  );
}
