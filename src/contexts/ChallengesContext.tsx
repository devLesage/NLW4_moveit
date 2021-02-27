import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
    type:'body' | 'eye';
    description: string;
    amount:number;
}
interface ChallengesContextData{
    level:number;
    currentExperience:number;
    challengesCompleted:number;
    activeChallenge:Challenge;
    experienceToNextLevel:number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal:() =>void;
}

interface ChallengesProviderProps{
    children:ReactNode
    level:number
    currentExperience:number
    challengesCompleted:number
      
      
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest } : ChallengesProviderProps){
    const[level, setLevel] = useState(rest.level ?? 1);
    const[currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const[challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const[activeChallenge, setActiveChallenge] = useState(null);

    const[isLevelModalOpen, setLevelModalOpen] = useState(false);
    const experienceToNextLevel = Math.pow((level+1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', level.toString());
        Cookies.set('currentExperience', currentExperience.toString());
        Cookies.set('challengesCompleted', challengesCompleted.toString());
    }, [level, currentExperience, challengesCompleted]) //use the function when these values has changed
    function levelUp(){
        setLevel(level + 1);
        setLevelModalOpen(true);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
        new Audio('/notification.mp3').play();
        if(Notification.permission === 'granted'){
            new Notification('Novo desafio! :P', {
                body: `Valendo ${challenge.amount}xp!`
            });
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const{ amount} = activeChallenge;
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    function closeLevelUpModal(){
        setLevelModalOpen(false);
    }
    return(
        <ChallengesContext.Provider value={{
            level, 
            currentExperience, 
            challengesCompleted, 
            activeChallenge,
            experienceToNextLevel,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal
            }}>
        {children}
        {isLevelModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    );
}
