import styles from "../styles/components/ChallengeBox.module.css"
import {useContext} from "react";
import {challengeContext} from "../contexts/ChallengeContext";

export function ChallengeBox() {

    //using context api
    const { activeChallenge } = useContext(challengeContext);

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Icon body"/>
                        <strong>Novo desafio</strong>
                        <p> { activeChallenge.description } </p>
                    </main>
                    <footer>
                        <button type="button" className={styles.challengeFailedButton}>Falhei</button>
                        <button type="button" className={styles.challengeSucceededButton}>Completei</button>
                    </footer>

                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um novo desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level up"/>
                        Avance de nível completando desafios
                    </p>
                </div>
            )}

        </div>
    );
}