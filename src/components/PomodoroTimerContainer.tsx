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

    const WorkingMinutsConst =  list.length!==0?list[0].time.workingMinuts*60:1*60

    const ShortBreakMinutsConst = list.length!==0?list[0].time.shortBreak*60:1*60

    const LongtBreakMinutsConst = list.length!==0?list[0].time.longBreak*60:2*60

    const [workingMinuts,setWorkingMinuts] = useState<number>(WorkingMinutsConst) //Время для таймера рабочего времени 

    const [shortBreak,setShortBreak] = useState<number>(ShortBreakMinutsConst) //Время для таймера короткого перерыва

    const [longBreak,setLongBreak] = useState<number>(LongtBreakMinutsConst) //Время для таймера большого перерыва 

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


    function currendDay ():string{
        return `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`
    }


    // функция для сброса рабочего таймера 
    function clearTimerUtil() {
        setIsTimerStarted(false)
        setIsPause(false)
        setWorkingMinuts(WorkingMinutsConst)
    }

    
    // Функция для сброса таймера на паузе и сохранение в статистику
    function changeTimeonBreak(){
        setClearTimerOnBreak(clearInterval(clearTimerOnBreak))
        getStatList.addBreakTime([currendDay(),timerOnBreak])
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
        setFirstTask(list[0])
        if (list.length!==0 && list[0].pomodoroNum===0){
            getTaskList.remove(list[0].id)
            clearTimerUtil()
        }   
        if (list.length===0){
           clearTimerUtil()
        }   

        if(list.length!==0 && ((list[0].pomodoroEndNum-list[0].pomodoroNum + 1) % 4 === 0)){
            setIsLongBreak(true)
        }
    },[list[0]])



    useEffect(()=>{
        if(firstTask !== list[0]){
            clearTimerUtil()
            setClearTimer(clearInterval(clearTimer))
            setFirstTask(list[0])
        }
    },[list.length])

    useEffect(()=>{
        if(workingMinuts===0){
            getStatList.addWorkTime([currendDay(),(WorkingMinutsConst) - workingMinuts])
            getStatList.addDoneTask(currendDay())
            changeTimeonBreak()
            setIsBreak(true)
            setIsTimerStarted(true)
            setClearTimer(clearInterval(clearTimer))
            startBreakTimer()
            setWorkingMinuts(WorkingMinutsConst)
        }
       
    },[workingMinuts])

   useEffect(()=>{
    if(shortBreak===0 || longBreak===0){
        getTaskList.deletePomodoro(0)
        setClearTimer(clearInterval(clearTimer))
        setShortBreak(ShortBreakMinutsConst)
        setLongBreak(LongtBreakMinutsConst) 
        setIsTimerStarted(false)
        setIsPause(false)
        setIsLongBreak(false)
        setIsBreak(false)   
        
    }
   },[shortBreak,longBreak])

    function startTimer (){
       
        if(list.length !== 0){
            if(!statList[currendDay()]){
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
        getStatList.addWorkTime([currendDay(),(WorkingMinutsConst) - workingMinuts])
        setWorkingMinuts(WorkingMinutsConst)
        setIsBreak(true)
        setIsTimerStarted(true)
        startBreakTimer()  
        getStatList.addDoneTask(currendDay())
        changeTimeonBreak()
        
    }

    function stopTimer(){
        setClearTimer(clearInterval(clearTimer))
        setWorkingMinuts(WorkingMinutsConst)
        setIsTimerStarted(false)
        setIsPause(false)    
        changeTimeonBreak()
        getStatList.stops([currendDay()])
    }

    function skipBreak(){
        getTaskList.deletePomodoro(0)
        setClearTimer(clearInterval(clearTimer))
        setShortBreak(ShortBreakMinutsConst)
        setLongBreak(LongtBreakMinutsConst)
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