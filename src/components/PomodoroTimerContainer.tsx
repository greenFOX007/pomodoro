import { useStore } from "effector-react";
import React, { useEffect, useState } from "react";
import { IListItem } from "../storage/TaskListStorage";
import { getTaskList } from "./MainPage/FormAddItem";
import { PomodoroTimer } from "./PomodoroTimer";


export function PomodoroTimerContainer (){

    const taskList = useStore(getTaskList.$taskListitems)
    
    const list:Array<IListItem> = Object.values(taskList)

    const [workingMinuts,setWorkingMinuts] = useState<number>(list.length!==0?list[0].time.workingMinuts*60:25*60)

    const [shortBreak,setShortBreak] = useState<number>(list.length!==0?list[0].time.shortBreak*60:25*60)

    const [isTimerStarted,setIsTimerStarted] = useState(false)

    const [isPause,setIsPause] = useState(false)

    const [clearTimer,setClearTimer] = useState<any>()

    const [firstTask,setFirstTask] = useState(list[0])

    const [isBreak,setIsBreak] = useState(false)

    useEffect(()=>{
        if (list.length!==0 && list[0].pomodoroNum===0){
            getTaskList.remove(list[0].id)
            setIsTimerStarted(false)
            setIsPause(false)
            setWorkingMinuts(list.length!==0?list[0].time.workingMinuts*60:25*60)
        } 
        if (list.length===0){
            setIsTimerStarted(false)
            setIsPause(false)
            setWorkingMinuts(list.length!==0?list[0].time.workingMinuts*60:25*60)
        }   
    },[list])

    useEffect(()=>{
        if(firstTask !== list[0]){
            setIsTimerStarted(false)
            setIsPause(false)
            setWorkingMinuts(list.length!==0?list[0].time.workingMinuts*60:25*60)
            setClearTimer(clearInterval(clearTimer))
            setFirstTask(list[0])
        }
    },[list.length])

    useEffect(()=>{
        if(workingMinuts===0){
            setIsBreak(true)
            setIsTimerStarted(true)
            setClearTimer(setInterval(()=>{setShortBreak(prev=>prev-1)},1000))
        }
        if(shortBreak===0){
            getTaskList.deletePomodoro(0)
            setClearTimer(clearInterval(clearTimer))
            setShortBreak(list.length!==0?list[0].time.shortBreak*60:25*60)
            setIsTimerStarted(false)
            setIsPause(false)
            setIsBreak(false)
            setWorkingMinuts(list.length!==0?list[0].time.workingMinuts*60:25*60)
        }

    },[workingMinuts,shortBreak])
    

    function startTimer (){
        if(list.length !== 0){
            setIsPause(false)
            setIsTimerStarted(true)

            if(!isBreak){
                setClearTimer(setInterval(()=>{setWorkingMinuts(prev=>prev-1)},1000))
            } else {
                setClearTimer(setInterval(()=>{setShortBreak(prev=>prev-1)},1000))
            }
        }
     }

    function pauseTimer (){
        setIsPause(true)
        setIsTimerStarted(false)
        setClearTimer(clearInterval(clearTimer))
    }

    function doneTask (){
        // getTaskList.deletePomodoro(0)
        setWorkingMinuts(list.length!==0?list[0].time.workingMinuts*60:25*60)
        setIsBreak(true)
        setIsTimerStarted(true)
        setClearTimer(setInterval(()=>{setShortBreak(prev=>prev-1)},1000))
    }

    function stopTimer(){
        setClearTimer(clearInterval(clearTimer))
        setWorkingMinuts(list.length!==0?list[0].time.workingMinuts*60:25*60)
        setIsTimerStarted(false)
        setIsPause(false)
    }

    function skipBreak(){
        getTaskList.deletePomodoro(0)
        setClearTimer(clearInterval(clearTimer))
        setShortBreak(list.length!==0?list[0].time.shortBreak*60:25*60)
        setIsTimerStarted(false)
        setIsPause(false)
        setIsBreak(false)
    }

    return(
        <>
         {!isBreak && <PomodoroTimer 
                // onStop={stopTimer} 
                // onDone={doneTask} 
                isTimerStarted={isTimerStarted} 
                // onStart={startTimer} 
                isTimerPause={isPause} 
                isBreak={isBreak}
                // onPause={pauseTimer} 
                name={list.length!==0?list[0].name:'Нет задач'} 
                minuts={Math.trunc(workingMinuts/60%60)} 
                seconds={Math.trunc(workingMinuts%60)} 
                pomodor={list.length!==0?list[0].pomodoroEndNum-list[0].pomodoroNum + 1 : 1}
                btnOneText={isTimerStarted?'Пауза':isPause?'Продолжить':'Старт'}
                btnTwoText={isTimerStarted?'Стоп':isPause?'Сделано':'Стоп'}
                onBtnOneClick={isTimerStarted?pauseTimer:startTimer}
                onBtnTwoClick={isPause?doneTask:stopTimer}
             />}
             {isBreak &&
                <PomodoroTimer 
                    isTimerStarted={isTimerStarted} 
                    isTimerPause={isPause} 
                    isBreak={isBreak}
                    name={list.length!==0?list[0].name:'Нет задач'} 
                    minuts={Math.trunc(shortBreak/60%60)} 
                    seconds={Math.trunc(shortBreak%60)} 
                    pomodor={list.length!==0?list[0].pomodoroEndNum-list[0].pomodoroNum + 1 : 1}
                    btnOneText={isTimerStarted?'Пауза':'Продолжить'}
                    btnTwoText={'Пропустить'}
                    onBtnOneClick={isTimerStarted?pauseTimer:startTimer}
                    onBtnTwoClick={skipBreak}
             />
             }
        </>
           
        
        
        
    )

}