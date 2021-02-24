import styles from '../styles/components/Profile.module.css';
export function Profile(){
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/devLesage.png" alt="Rafael Honorato"/>

            <div>
                <strong>Rafael Honorato</strong>
                <p>
                <img src="icons/level.svg" alt=""/>
                Level 1</p>
            </div>
        </div>
    );
}