import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';


let countdownTimeout : NodeJS.Timeout;
export function Countdown(){
    const {startNewChallenge} = useContext(ChallengesContext)

    const[time, settime] = useState(5);
    const[isActive, setActive] = useState(false);
    const[Finished, setFinished] = useState(false);

    const minutes = Math.floor(time/60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');

    function startCountdown(){
        setActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setActive(false);
        settime(25 * 60);
    }

    useEffect(() => {
        if(isActive && time>0){
            countdownTimeout = setTimeout(() => {
                settime(time-1);
            }, 1000);
        }else if(isActive && time == 0){
            setFinished(true);
            setActive(false);
            startNewChallenge();
        }
    }, [isActive, time])
    return(
        <div>
        <div className={styles.countdownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
                <span>{secondLeft}</span>
                <span>{secondRight}</span>
            </div>
        </div>
        {Finished ? (
            <button 
            disabled
            className={styles.countdownButton}           
            >
            <footer>Ciclo Encerrado <img src="icons/check.svg" alt=""/></footer>
             </button>
        ) : (
            <>
                { isActive ? (
                    <button type="button" 
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                    onClick={resetCountdown} 
                    >
                    Abandonar Ciclo
                    </button>
                ) : (
                    <button type="button" onClick={startCountdown} className={styles.countdownButton}>
                    Iniciar um ciclo
                    </button>  
                )}
            </>
        )}
         </div>       
    );
}