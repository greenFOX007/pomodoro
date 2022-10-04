import { createEvent, createStore } from "effector"
import React from 'react'


interface IListItem {
    name: string,
    id:string,
    time:number,
} 


export function TaskListApi (initial: IListItem[]){
    const insert = createEvent<IListItem>()
    const remove = createEvent<string>()
    const change = createEvent<string>()
    const reset = createEvent<void>()

    const $input = createStore<string>('')
        .on(change, (_, value) => value).reset(reset, insert)

    const $taskListitems = createStore<IListItem[]>(initial)
    .on(insert, (taskList, newtaskItem) => [...taskList, newtaskItem])
    .on(remove, (taskLits, index) => taskLits.filter((item) =>  item.id !== index.toString()))

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
      insert,
      $taskListitems,
      $input,
  }

}

