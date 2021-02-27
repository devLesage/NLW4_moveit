import { useState, useEffect, useContext } from 'react';
import {CountdownContext} from '../contexts/CountdownContext';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';


let countdownTimeout : NodeJS.Timeout;
export function Countdown(){
    const{minutes, seconds, Finished, isActive, startCountdown, resetCountdown} = useContext(CountdownContext);
    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');
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