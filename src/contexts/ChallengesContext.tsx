import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from "../../challenges.json";
import Cookies from "js-cookie";

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
  level: number;
  currentExperience: number;
  challengeCompleted: number
}

// exporting
export const ChallengesContext = createContext({} as challengeContextData);

export function ChallengesProvider({ children, ...rest }: ChallengeProviderProps) {
  
  // states
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  
  // constants
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
  
  // effects - Browser Notification
  useEffect(() => {
    Notification.requestPermission();
  }, [])
  
  useEffect(() => {
    Cookies.set("level", String(level))
    Cookies.set("currentExperience", String(currentExperience))
    Cookies.set("challengeCompleted", String(challengeCompleted))
  }, [level, currentExperience, challengeCompleted]);
  
  // functions
  function levelUp() {
    setLevel(level + 1);
  }
  
  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    
    setActiveChallenge(challenge);
    
    // Browser Notification
    new Audio("/notification.mp3").play().catch(() => "");
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
