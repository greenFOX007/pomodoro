import classNames from "classnames";
import { useStore } from "effector-react";
import { ChangeEvent, FormEvent, useEffect, useState} from "react";
import { TaskListApi } from "../../storage/TaskListStorage";
import { generateRamdomID } from "../../utills/generateRandomIndex";
import { Button } from "./Button";
import { TaskList } from "./TaskList";


export const getTaskList = TaskListApi(JSON.parse(localStorage.getItem('TaskItem')||'[]'))



export function FormAddItem (){

    

    const input = useStore(getTaskList.$input)
    const taskList = useStore(getTaskList.$taskListitems)
    const [isValidInput,setIsValidInput] = useState<Boolean>(true)
    
    
    function handleChange (e:ChangeEvent<HTMLInputElement>){
        getTaskList.change(e.currentTarget.value)
    }

    useEffect(()=>{
        localStorage.setItem('TaskItem',JSON.stringify(taskList))
    },[taskList])

    function handleSubmit (e:FormEvent) {
        e.preventDefault()
        if(input!==''){
            setIsValidInput(true)
            getTaskList.insert({
                name:input,
                id:generateRamdomID(),
                time:{
                    workingMinuts:1,
                    shortBreak:1,
                    longBreak:2},
                pomodoroNum:1,
                pomodoroEndNum:1})   
        }else{
            setIsValidInput(false)
        }
            
    }  

    const inputStyle = classNames(
        'bg-gray-F4 w-full block pl-4 text-base leading-4 py-5 focus:outline-none',
        {'placeholder:text-gray-99':isValidInput},
        {'placeholder:text-main-red':!isValidInput},
    )
    

    return (
        <div className="w-96">
            <form onSubmit={handleSubmit} className="mb-6">
                 <input 
                    type={"text"} 
                    placeholder={isValidInput?'Название задачи':'Введите название!'} 
                    onChange={handleChange} 
                    value={input} 
                    className={inputStyle}
                 />
                 <Button green={true} type={'submit'} text={'Добавить'} styles={'mt-6'} />
            </form>
            <TaskList list={taskList} />
        </div>
        
    )
}