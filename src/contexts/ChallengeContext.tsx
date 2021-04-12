import {createContext, ReactNode, useState} from "react";

// typing variables
interface challengeContextData {
    level: number;
    currentExperience: number;
    challengeCompleted: number;
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

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        console.log("New challenge...")
    }

    return (
        <challengeContext.Provider value={
            {level, currentExperience, challengeCompleted, levelUp, startNewChallenge}
        }>
            {children}
        </challengeContext.Provider>
    );
}
