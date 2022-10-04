import React from 'react'
import { Button } from './MainPage/Button'

export function PomodoroTimer (){
    return (
        <div className='bg-gray-F4 w-3/5 pb-10'>
            <div className='bg-gray-C4 flex justify-between text-white text-base leading-4 py-5 px-10 mb-16'>
                <div className=''>Названия дела</div>
                <div className=''>Помидор 1</div>
            </div>
            <div className=''>
                <div className='flex justify-center items-center'>
                    <div className='text-150px leading-180px font-extralight mr-6'>25:00</div>
                    <button className='bg-gray-C4 w-12 h-12 rounded-full text-white text-3xl font-normal'>+</button>
                </div>
               <div className='flex justify-center text-base mb-8'>
                    <span className='text-gray-99 mr-1'>Задача1 -</span>
                    <span className=''>Сверстать сайт</span>
                </div>
               <div className='flex justify-center'>
                    <Button green={true} styles={'mr-6'} text={'Старт'} />
                    <Button green={false} text={'Стоп'}/>
               </div>
            </div>
        </div>
    )
}