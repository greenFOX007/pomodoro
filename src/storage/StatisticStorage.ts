import { createEvent, createStore } from "effector"
import React from 'react'
import { getDay } from "../utills/getDay"
import { numOfWeekNow } from "../utills/numOfWeek"

export interface IStatList {
    doneTasks:number,
    doneWorkTime:number,
    breakTime:number,
    stops:number,
}

export interface IList<IStatList> {
    [N:string]:IStatList
}



export function StatListApi (initial: IList<IStatList>){
    const insert = createEvent<IStatList>()
    const addDoneTask = createEvent<string>()
    const addWorkTime = createEvent<[string,number]>()
    const addBreakTime = createEvent<[string,number]>()
    const stops = createEvent<[string]>()
    const changeCurrentWeek = createEvent<string>()
    const changeCurrentDay = createEvent<string>()
    const insertWeek = createEvent<string>()
    const insertDay = createEvent<string>()
    const reset = createEvent<void>()
    const changeCurrentDayName = createEvent<number>()
    const insertDayName = createEvent<string>()


    const $currentWeek = createStore<string>(`${numOfWeekNow()}`)
    .on(changeCurrentWeek, (_, value) => value).reset(reset, insertWeek)

    const $currentDay = createStore<string>(`${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`)
    .on(changeCurrentDay, (_, value) => value).reset(reset, insertDay)

    const $currentDayName = createStore<number>(getDay(`${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`) )
    .on(changeCurrentDayName, (_, value) => value).reset(reset, insertDayName)


    const $statListitems = createStore<IList<IStatList>>(initial)
    .on(insert, (statList, newStatItem) => ({...statList, [`${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`]:newStatItem}))
    .on(addDoneTask, (statList,key)=> ({...statList,[key]:{...statList[key], doneTasks:statList[key].doneTasks+1}}))
    .on(addWorkTime, (statList,[key,time])=> ({...statList,[key]:{...statList[key],doneWorkTime:statList[key].doneWorkTime+time}}))
    .on(addBreakTime, (statList,[key,time])=> ({...statList,[key]:{...statList[key],breakTime:statList[key].breakTime+time}}))
    .on(stops,((statList, [key])=> ({...statList,[key]:{...statList[key],stops:statList[key].stops+1}})))

    const submit = createEvent<React.SyntheticEvent>()
     submit.watch(event => event.preventDefault())

  
    return {
      insert,
      $statListitems,
      addDoneTask,
      addWorkTime,
      addBreakTime,
      stops,
      $currentWeek,
      $currentDay,
      changeCurrentWeek,
      changeCurrentDay,
      $currentDayName,
      changeCurrentDayName,
  }

}

