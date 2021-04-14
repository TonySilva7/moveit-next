import { GetServerSideProps } from "next";
import Head from "next/head";
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { CountdownProvider } from "../contexts/CountdownContext";
import styles from "../styles/pages/Home.module.css";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

export default function Home(props) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengeCompleted={props.challengeCompleted}
    >
      <div className={ styles.container }>
        <Head>
          <title>Início | Move.it</title>
        </Head>
        
        <ExperienceBar/>
        
        <CountdownProvider>
          <section>
            <div>
              <Profile/>
              <CompletedChallenges/>
              <Countdown/>
            </div>
            
            <div>
              <ChallengeBox/>
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // chamada api
  const { level, currentExperience, challengeCompleted } = context.req.cookies;
  
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted)
    }
  };
};
