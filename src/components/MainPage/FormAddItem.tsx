import { useStore } from "effector-react";
import { ChangeEvent, FormEvent, useEffect} from "react";
import { StatListApi } from "../../storage/StatisticStorage";
import { TaskListApi } from "../../storage/TaskListStorage";
import { generateRamdomID } from "../../utills/generateRandomIndex";
import { Button } from "./Button";
import { TaskList } from "./TaskList";


export const getTaskList = TaskListApi(JSON.parse(localStorage.getItem('TaskItem')||'[]'))



export function FormAddItem (){

    

    const input = useStore(getTaskList.$input)
    const taskList = useStore(getTaskList.$taskListitems)
    
    
    function handleChange (e:ChangeEvent<HTMLInputElement>){
        getTaskList.change(e.currentTarget.value)
    }

    useEffect(()=>{
        localStorage.setItem('TaskItem',JSON.stringify(taskList))
    },[taskList])

    function handleSubmit (e:FormEvent) {
        e.preventDefault()
        getTaskList.insert({name:input,id:generateRamdomID(),time:{workingMinuts:25,shortBreak:5,longBreak:20},pomodoroNum:1,pomodoroEndNum:1})        
    }  
    

    return (
        <div className="w-96">
            <form onSubmit={handleSubmit} className="mb-6 ">
                 <input 
                    type={"text"} 
                    placeholder={'Название задачи'} 
                    onChange={handleChange} 
                    value={input} 
                    className="bg-gray-F4 w-full block pl-4 text-base leading-4 py-5 focus:outline-none placeholder:text-gray-99"
                 />
                 <Button green={true} type={'submit'} text={'Добавить'} styles={'mt-6'} />
            </form>
            <TaskList list={taskList} />
        </div>
        
    )
}