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
    activeChallenge: challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
}
interface ChallengeProviderProps {
    children: ReactNode;
}

// exporting
export const challengeContext = createContext({} as challengeContextData);

export function ChallengesProvider({ children }: ChallengeProviderProps) {

    const [level, setLevel] = useState(1);
    const [currentExperience, useCurrentExperience] = useState(0);
    const [challengeCompleted, setChallengeCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
    }

    return (
        <challengeContext.Provider value={
            {level, currentExperience, challengeCompleted, levelUp, startNewChallenge, activeChallenge}
        }>
            {children}
        </challengeContext.Provider>
    );
}
