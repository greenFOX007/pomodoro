import { useStore } from "effector-react";
import React, { useEffect, useState } from "react";
import { IListItem } from "../storage/TaskListStorage";
import { getTaskList } from "./MainPage/FormAddItem";
import { PomodoroTimer } from "./PomodoroTimer";


export function PomodoroTimerContainer (){

    const taskList = useStore(getTaskList.$taskListitems)
    
    const list:Array<IListItem> = Object.values(taskList)

    const [minuts,setMinuts] = useState<number>(list.length!==0?list[0].time.minuts*60:25*60)

    const [isTimerStarted,setIsTimerStarted] = useState(false)

    const [isPause,setIsPause] = useState(false)

    const [clearTimer,setClearTimer] = useState<any>()

    const [firstTask,setFirstTask] = useState(list[0])

    useEffect(()=>{
        if (list.length!==0 && list[0].pomodoroNum===0){
            getTaskList.remove(list[0].id)
            setIsTimerStarted(false)
            setIsPause(false)
            setMinuts(list.length!==0?list[0].time.minuts*60:25*60)
        } 
        if (list.length===0){
            setIsTimerStarted(false)
            setIsPause(false)
            setMinuts(list.length!==0?list[0].time.minuts*60:25*60)
        }   
    },[list])

    useEffect(()=>{
        if(firstTask !== list[0]){
            setIsTimerStarted(false)
            setIsPause(false)
            setMinuts(list.length!==0?list[0].time.minuts*60:25*60)
            setClearTimer(clearInterval(clearTimer))
            setFirstTask(list[0])
        }
    },[list.length])
    

    function startTimer (){
        if(list.length !== 0){
            setIsTimerStarted(true)
            setClearTimer(setInterval(()=>{setMinuts(prev=>prev-1)},1000))
        }
     }

    function pauseTimer (){
        setIsPause(true)
        setIsTimerStarted(false)
        setClearTimer(clearInterval(clearTimer))
    }

    function doneTask (){
        getTaskList.deletePomodoro(0)
        setMinuts(list.length!==0?list[0].time.minuts*60:25*60)
        setIsPause(false)
        setIsTimerStarted(false)
    }

    function stopTimer(){
        setClearTimer(clearInterval(clearTimer))
        setMinuts(list.length!==0?list[0].time.minuts*60:25*60)
        setIsTimerStarted(false)
        setIsPause(false)
    }


    return(
        <PomodoroTimer 
            onStop={stopTimer} 
            onDone={doneTask} 
            isTimerStarted={isTimerStarted} 
            onStart={startTimer} 
            isTimerPause={isPause} 
            onPause={pauseTimer} 
            name={list.length!==0?list[0].name:'Нет помодоров'} 
            minuts={Math.trunc(minuts/60%60)} 
            seconds={Math.trunc(minuts%60)} 
            pomodor={list.length!==0?list[0].pomodoroEndNum-list[0].pomodoroNum + 1 : 1}
        />
    )

}