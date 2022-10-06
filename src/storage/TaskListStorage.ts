import { createEvent, createStore } from "effector"
import React from 'react'



interface IListItem {
    name: string,
    id:string,
    time:number,
    pomodoroNum:number,
} 

interface IList<IListItem> {
    [N:number]:IListItem
}


export function TaskListApi (initial: IList<IListItem>){
    const insert = createEvent<IListItem>()
    const remove = createEvent<string>()
    const change = createEvent<string>()
    const reset = createEvent<void>()
    const addPomodoro = createEvent<number>()
    const deletePomodoro = createEvent<number>()

    const $input = createStore<string>('')
        .on(change, (_, value) => value).reset(reset, insert)

    const $taskListitems = createStore<IList<IListItem>>(initial)
    .on(insert, (taskList, newtaskItem) => ({...taskList,[Object.keys(taskList).length]:newtaskItem}))
    .on(remove, (taskLits, index) => ({...Object.values(taskLits).filter((item) =>  item.id !== index.toString())}))
    .on(addPomodoro, (taskList, key)=> ({...taskList,[key]:{...taskList[key],pomodoroNum:taskList[key].pomodoroNum+1}}))
    .on(deletePomodoro,(taskList, key)=> ({...taskList,[key]:{...taskList[key],pomodoroNum:taskList[key].pomodoroNum-1}}))

    const submit = createEvent<React.SyntheticEvent>()
     submit.watch(event => event.preventDefault())

    //  sample({
    //     clock: submit,
    //     source: $input,

    //     target: insert,
    //   })
  
    return {
      submit,
      remove,
      change,
      reset,
      addPomodoro,
      deletePomodoro,
      insert,
      $taskListitems,
      $input,
  }

}

