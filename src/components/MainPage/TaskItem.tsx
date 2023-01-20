
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { BasketSVG, MinusSVG, PensilSVG, PlusSVG, ThreeDotsSVG } from '../../img/SVGicons'

import { getTaskList } from './FormAddItem'
import { ModalApprove } from './ModalApprove'



interface IItem {
    name:string,
    id:string,
    itemNum:number,
    objKey:number,
}



export function TaskItem ({name,id,itemNum,objKey}:IItem){

    const [isOpen, setIsOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isChangeOpen,setIsChangeOpen] = useState(false)
    const [changeValue,setChangeValue] = useState(name)

    const ref = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(()=>{
        function handleClick (event:MouseEvent) {
            if(event.target instanceof Node && !ref.current?.contains(event.target) && !buttonRef.current?.contains(event.target))
            setIsOpen(false)
        }

        document.addEventListener('click', handleClick)

        return ()=>{
            document.removeEventListener('click',handleClick)
          }
    },[])

    function handleClick() {
        setIsOpen(!isOpen)
    }

    function handleDelete (e:React.SyntheticEvent){
        e.preventDefault()
        getTaskList.remove(id)  
    }

    function handleAddPomodoro (e:React.SyntheticEvent){
        e.preventDefault()
        getTaskList.addPomodoro(objKey)
    }

    function handleDeletePomodoro (e:React.SyntheticEvent){
        e.preventDefault()
        getTaskList.deleteNumPomodoro(objKey)
    }

    function handleCloseModal (e:React.SyntheticEvent){
        e.preventDefault()
        setIsModalOpen(false)
    }

    function handleOpenModal (e:React.SyntheticEvent){
        e.preventDefault()
        setIsOpen(false)
        setIsModalOpen(true)
    }

    function openChangeInput (e:React.SyntheticEvent){
        e.preventDefault()
        setIsChangeOpen(!isChangeOpen)
    }

    function handleChangeValue (e:ChangeEvent<HTMLInputElement>) {
        setChangeValue(e.currentTarget.value)
    }

    function handleChangeTask (e:React.SyntheticEvent){
        e.preventDefault()
        e.stopPropagation()
        getTaskList.changeTask({key:objKey,value:changeValue})
        setIsChangeOpen(false)
    }
    

    return (
        <li id={`${id}`} className='py-4 border-y flex justify-between -mt-px'>
            <div className='flex items-center'>
                <div className='w-6 h-6 border border-gray-C4 rounded-full flex justify-center items-center mr-2'>{itemNum}</div>
                <div className=''>{name}</div>
            </div>
            <div className='relative'>
            <button ref={buttonRef} onClick={handleClick} className='w-8 h-8  rounded-full flex justify-center items-center'>
               <ThreeDotsSVG />
            </button>
            {isOpen && (
                <div ref={ref} className='absolute top-10 left-1/2 -translate-x-1/2 border taskItem_dropdown z-10'>
                    <div className='taskItem_dropdown relative'>
                        <ul className='bg-white py-1'>
                            <li className='hover:bg-gray-F4 transition-all px-3 py-1'>
                                <button onClick={handleAddPomodoro} className='flex p-2 w-full '>
                                    <PlusSVG/>
                                    <span className='ml-3'>Увеличить</span>
                                </button>
                            </li>
                            <li className='hover:bg-gray-F4 transition-all px-3 py-1'>
                                <button onClick={handleDeletePomodoro} disabled={itemNum===1?true:false} className='flex p-2 w-full '>
                                    <MinusSVG/>
                                    <span className='ml-1'>Уменьшить</span>
                                </button>
                            </li>
                            <li className='hover:bg-gray-F4 transition-all px-3 py-1'>
                                <button onClick={openChangeInput} className='flex p-2 w-full '>
                                    <PensilSVG />
                                    <span className='ml-3'>Редактировать</span>
                                </button>
                                {isChangeOpen && (
                                    <div className=' w-full -right-full h-full flex bg-white border'>
                                        <input className='pl-2 outline-none' value={changeValue} onChange={handleChangeValue} type="text"/>
                                        <button onClick={handleChangeTask} className='p-2 bg-main-green w-full'>OK</button>
                                    </div>)
                                }
                            </li>
                            <li className='hover:bg-gray-F4 transition-all px-3 py-1'>
                                <button onClick={handleOpenModal} className='flex p-2 w-full '>
                                    <BasketSVG />
                                    <span className='ml-3'>Удалить</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            </div>
            
            {isModalOpen && (<ModalApprove onClose={handleCloseModal} onDelete={handleDelete}/>)}
        </li>
    )
}