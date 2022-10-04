import React, { useEffect, useState } from 'react'
import { TaskItem } from './TaskItem'

interface IItem {
    name:string,
    id:string,
    time:number
}

interface IList {
    list:Array<IItem>
}

export function TaskList ({list}:IList){
    const [time,setTime] = useState<number>(0)
    // const [id,setId] = useState()

    useEffect(()=>{
        const arr:number[] = []
        if(list.length !== 0){
            list.map((item)=>arr.push(item.time))
            const summ = arr.reduce((prev,curr)=>prev+curr)
            setTime(summ)
        }
        
    },[list])

    return (
        <div className=''>
            <ul className='mb-5'>
                {list.map((item,index)=>(
                    <TaskItem itemNum={index+1} id={item.id} name={item.name} key={item.id} />
                ))}
            </ul>
            <div className='text-gray-99 text-base leading-4 font-light'>{time}</div>
        </div>
        
    )
}