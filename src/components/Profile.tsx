import styles from "../styles/components/Profile.module.css";

export function Profile() {
  return (
    <div className={ styles.profileContainer }>
      <img src="https://avatars.githubusercontent.com/u/77233531?v=4" alt="Tony Silva"/>
      <div>
        <strong>Tony Silva</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
        </p>
      </div>
    </div>
  );
}