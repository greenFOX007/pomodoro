import { createEvent, createStore } from "effector"
import React from 'react'



 export interface IListItem {
    name: string,
    id:string,
    time:{
        workingMinuts:number,
        shortBreak:number,
        longBreak:number,
    },
    pomodoroNum:number,
    pomodoroEndNum:number,
} 

interface IList<IListItem> {
    [N:number]:IListItem
}

interface IChangeTask {
    key:number;
    value:string
}


export function TaskListApi (initial: IList<IListItem>){
    const insert = createEvent<IListItem>()
    const remove = createEvent<string>()
    const change = createEvent<string>()
    const changeTask = createEvent<IChangeTask>()
    const reset = createEvent<void>()
    const addPomodoro = createEvent<number>()
    const deletePomodoro = createEvent<number>()
    const deleteNumPomodoro = createEvent<number>()

    const $input = createStore<string>('')
        .on(change, (_, value) => value).reset(reset, insert)

    const $taskListitems = createStore<IList<IListItem>>(initial)
    .on(insert, (taskList, newtaskItem) => ({
        ...taskList,
        [Object.keys(taskList).length]:newtaskItem
    }))

    .on(remove, (taskLits, index) => ({
        ...Object.values(taskLits).filter((item) => item.id !== index.toString())
    }))

    .on(addPomodoro, (taskList, key)=> ({
        ...taskList,
        [key]:{
            ...taskList[key],
            pomodoroNum:taskList[key].pomodoroNum+1,
            pomodoroEndNum:taskList[key].pomodoroEndNum+1
        }
    }))

    .on(deleteNumPomodoro, (taskList, key)=> ({
        ...taskList,
        [key]:{
            ...taskList[key],
            pomodoroNum:taskList[key].pomodoroNum-1,
            pomodoroEndNum:taskList[key].pomodoroEndNum-1
        }
    }))

    .on(deletePomodoro,(taskList, key)=> ({
        ...taskList,
        [key]:{
            ...taskList[key],
            pomodoroNum:taskList[key].pomodoroNum-1
        }
    }))

    
    
    .on(changeTask,((taskList, {key,value})=> ({
        ...taskList,
        [key]:{
            ...taskList[key],
            name:value
        }
    })))

    const submit = createEvent<React.SyntheticEvent>()
     submit.watch(event => event.preventDefault())

  
    return {
      submit,
      remove,
      change,
      changeTask,
      reset,
      addPomodoro,
      deletePomodoro,
      insert,
      $taskListitems,
      $input,
      deleteNumPomodoro,
  }

}

