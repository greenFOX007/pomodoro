import { useEffect, useState } from 'react'
import { TaskItem } from './TaskItem'


interface IList1 {
    list:IList<IListItem>
}
interface IListItem {
    name: string,
    id:string,
    time:number,
    pomodoroNum:number,
} 

interface IList<IListItem> {
    [N:number]:IListItem
}


export function TaskList ({list}:IList1){
    const [time,setTime] = useState<number>(0)

    useEffect(()=>{
        const arr:number[] = []
        if(Object.values(list).length !== 0){
            Object.values(list).map((item)=>arr.push(item.time*item.pomodoroNum))
            const summ = arr.reduce((prev,curr)=>prev+curr)
            setTime(summ)
        }
        
    },[list])

    return (
        <div className=''>
            <ul className='mb-5'>
                {Object.values(list).map((item,index)=>(
                    <TaskItem objKey={index} itemNum={item.pomodoroNum} id={item.id} name={item.name} key={item.id} />
                ))}
            </ul>
            <div className='text-gray-99 text-base leading-4 font-light'>{time}</div>
        </div>
        
    )
}