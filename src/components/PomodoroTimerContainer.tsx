import { useStore } from "effector-react";
import { useEffect, useState } from "react";
import { IListItem } from "../storage/TaskListStorage";
import { getTaskList } from "./MainPage/FormAddItem";
import { PomodoroTimer } from "./PomodoroTimer";
import { getStatList } from "./StatsPage/StatsPage";


export function PomodoroTimerContainer (){

    const taskList = useStore(getTaskList.$taskListitems)

    const statList = useStore(getStatList.$statListitems)
    
    const list:Array<IListItem> = Object.values(taskList)

    const [workingMinuts,setWorkingMinuts] = useState<number>(list.length!==0?list[0].time.workingMinuts*60:25*60) //Время для таймера рабочего времени 

    const [shortBreak,setShortBreak] = useState<number>(list.length!==0?list[0].time.shortBreak*60:5*60) //Время для таймера короткого перерыва

    const [longBreak,setLongBreak] = useState<number>(list.length!==0?list[0].time.longBreak*60:25*60) //Время для таймера большого перерыва 

    const [isTimerStarted,setIsTimerStarted] = useState(false) 

    const [isPause,setIsPause] = useState(false)

    const [isBreak,setIsBreak] = useState(false)

    const [isLongBreak, setIsLongBreak] = useState(false)

    const [clearTimer,setClearTimer] = useState<any>() // Создание таймеров и очистки для помидоров

    const [clearTimerOnBreak,setClearTimerOnBreak] = useState<any>() // создание и очистка таймера для статистики времени на паузе

    const [firstTask,setFirstTask] = useState(list[0])

    const [timerOnBreak,setTimerOnBreak] = useState<number>(0) // время на паузе


    useEffect(()=>{
        localStorage.setItem('StatItem',JSON.stringify(statList))
    },[statList])


    // функция для сброса рабочего таймера 
    function clearTimerUtil() {
        setIsTimerStarted(false)
        setIsPause(false)
        setWorkingMinuts(list.length!==0?list[0].time.workingMinuts*60:25*60)
    }

    
    // Функция для сброса таймера на паузе и сохранение в статистику
    function changeTimeonBreak(){
        let time = `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`
        setClearTimerOnBreak(clearInterval(clearTimerOnBreak))
        getStatList.addBreakTime([time,timerOnBreak])
        setTimerOnBreak(0)
    }

    //Функция для старта перерыва
    function startBreakTimer(){
        if(isLongBreak){
            setClearTimer(setInterval(()=>{setLongBreak(prev=>prev-1)},1000))
        }else{
            setClearTimer(setInterval(()=>{setShortBreak(prev=>prev-1)},1000))
        }
    }

    useEffect(()=>{
        if (list.length!==0 && list[0].pomodoroNum===0){
            getTaskList.remove(list[0].id)
            clearTimerUtil()
        }   
        if (list.length===0){
           clearTimerUtil()
        }   

        if(list.length!==0 && (list[0].pomodoroEndNum-list[0].pomodoroNum + 1) % 4 === 0){
            setIsLongBreak(true)
        }

    },[list])

    useEffect(()=>{
        if(firstTask !== list[0]){
            clearTimerUtil()
            setClearTimer(clearInterval(clearTimer))
            setFirstTask(list[0])
        }
    },[list.length])

    useEffect(()=>{
        if(workingMinuts===0){
            let time = `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`
            getStatList.addWorkTime([time,(list.length!==0?list[0].time.workingMinuts*60:25*60) - workingMinuts])
            getStatList.addDoneTask(time)
            changeTimeonBreak()
            setIsBreak(true)
            setIsTimerStarted(true)
            startBreakTimer()
        }
        if(shortBreak===0 || longBreak===0){
            getTaskList.deletePomodoro(0)
            setClearTimer(clearInterval(clearTimer))
            setShortBreak(list.length!==0?list[0].time.shortBreak*60:5*60)
            setLongBreak(list.length!==0?list[0].time.longBreak*60:25*60)
            setIsTimerStarted(false)
            setIsPause(false)
            setIsBreak(false)
            setWorkingMinuts(list.length!==0?list[0].time.workingMinuts*60:25*60)
        }
    },[workingMinuts,shortBreak])

   

    function startTimer (){
        let time = `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`
        if(list.length !== 0){
            if(!statList[time]){
                getStatList.insert({doneTasks:0,doneWorkTime:0,breakTime:0,stops:0})
            }

            changeTimeonBreak()
           
            setIsPause(false)
            setIsTimerStarted(true)

            if(!isBreak){
                setClearTimer(setInterval(()=>{setWorkingMinuts(prev=>prev-1)},1000))
            } else {
                startBreakTimer()
                
            }
        }
     }

    function pauseTimer (){
       
        setClearTimerOnBreak(setInterval(()=>{setTimerOnBreak(prev=>prev+1)},1000))
        setIsPause(true)
        setIsTimerStarted(false)
        setClearTimer(clearInterval(clearTimer))

    }

    function doneTask (){
        let time = `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`
        getStatList.addWorkTime([time,(list.length!==0?list[0].time.workingMinuts*60:25*60) - workingMinuts])
        setWorkingMinuts(list.length!==0?list[0].time.workingMinuts*60:25*60)
        setIsBreak(true)
        setIsTimerStarted(true)
        startBreakTimer()
        getStatList.addDoneTask(time)
        changeTimeonBreak()
        
    }

    function stopTimer(){
        let time = `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`
        setClearTimer(clearInterval(clearTimer))
        setWorkingMinuts(list.length!==0?list[0].time.workingMinuts*60:25*60)
        setIsTimerStarted(false)
        setIsPause(false)    
        changeTimeonBreak()
        getStatList.stops([time])
    }

    function skipBreak(){
        getTaskList.deletePomodoro(0)
        setClearTimer(clearInterval(clearTimer))
        setShortBreak(list.length!==0?list[0].time.shortBreak*60:5*60)
        setLongBreak(list.length!==0?list[0].time.longBreak*60:5*60)
        setIsTimerStarted(false)
        setIsPause(false)
        setIsBreak(false)
        setIsLongBreak(false)
        changeTimeonBreak()
    }

    return(
        <>
         {!isBreak && <PomodoroTimer 
                isTimerStarted={isTimerStarted} 
                isTimerPause={isPause} 
                isBreak={isBreak}
                name={list.length!==0?list[0].name:'Нет задач'} 
                minuts={workingMinuts} 
                seconds={workingMinuts} 
                pomodor={list.length!==0?list[0].pomodoroEndNum-list[0].pomodoroNum + 1 : 1}
                btnOneText={isTimerStarted?'Пауза':isPause?'Продолжить':'Старт'}
                btnTwoText={isTimerStarted?'Стоп':isPause?'Сделано':'Стоп'}
                onBtnOneClick={isTimerStarted?pauseTimer:startTimer}
                onBtnTwoClick={isPause?doneTask:stopTimer}
            />
        }
        {isBreak && <PomodoroTimer 
                isTimerStarted={isTimerStarted} 
                isTimerPause={isPause} 
                isBreak={isBreak}
                name={list.length!==0?list[0].name:'Нет задач'} 
                minuts={isLongBreak?longBreak:shortBreak} 
                seconds={isLongBreak?longBreak:shortBreak} 
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