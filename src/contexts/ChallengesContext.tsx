import {createContext, ReactNode, useState} from "react";
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
}
interface ChallengeProviderProps {
    children: ReactNode;
}

// exporting
export const ChallengesContext = createContext({} as challengeContextData);

export function ChallengesProvider({ children }: ChallengeProviderProps) {

    // states
    const [level, setLevel] = useState(1);
    const [currentExperience, useCurrentExperience] = useState(0);
    const [challengeCompleted, setChallengeCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    // constants
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    // functions
    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null);
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
                resetChallenge
            }
        }>
            {children}
        </ChallengesContext.Provider>
    );
}
