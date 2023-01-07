import classnames from 'classnames'
import React from 'react'


import { Button } from './MainPage/Button'

interface IPomodoroTimer {
    name:string,
    minuts:number,
    seconds:number,
    pomodor:number,  
    isTimerStarted:boolean,
    isTimerPause:boolean,
    isBreak?:boolean
    btnOneText:string;
    btnTwoText:string,
    onBtnOneClick:(e:React.SyntheticEvent)=>void,
    onBtnTwoClick:(e:React.SyntheticEvent)=>void,
}


export function PomodoroTimer (props:IPomodoroTimer){

    const headerStyles = classnames(
        'flex justify-between text-white text-base leading-4 py-5 px-10 mb-16',
        {[`bg-main-red`]:props.isTimerStarted===true||props.isTimerPause===true},
        {[`bg-gray-C4`]:props.isTimerStarted===false&&props.isTimerPause===false},
        {[`bg-main-green`]:props.isBreak===true},
    )

    const textStyles = classnames(
        'text-150px leading-180px font-extralight mr-6',
        {[`text-main-red`]:props.isTimerStarted===true&&props.isBreak===false},
        {[`text-main-green`]:props.isTimerStarted===true&&props.isBreak===true},
    )

   

    return (
        <div className='bg-gray-F4 w-3/5 pb-10'>
            <div className={headerStyles}>
                <div className=''>{props.name}</div>
                <div className=''>{!props.isBreak?`Помидор ${props.pomodor}`:`Перерыв ${props.pomodor}`}</div>
            </div>
            <div className=''>
                <div className='flex justify-center items-center'>
                    <div className={textStyles}>
                        {Math.trunc(props.minuts/60%60)<10?`0${Math.trunc(props.minuts/60%60)}`:Math.trunc(props.minuts/60%60)}:{Math.trunc(props.seconds%60)<10?`0${Math.trunc(props.seconds%60)}`:Math.trunc(props.seconds%60)}
                    </div>
                    {/* <button className='bg-gray-C4 w-12 h-12 rounded-full text-white text-3xl font-normal'>+</button> */}
                </div>
               <div className='flex justify-center text-base mb-8'>
                    <span className='text-gray-99 mr-1'>Задача -</span>
                    <span className=''>{props.name}</span>
                </div>
               <div className='flex justify-center'>
                    <Button 
                        handleClick={props.onBtnOneClick} 
                        green={true} styles={'mr-6'}  
                        text={props.btnOneText} 
                    />
                    
                    <Button 
                        handleClick={props.onBtnTwoClick} 
                        disabled={props.isTimerStarted?false:props.isTimerPause?false:true} 
                        green={false} 
                        text={props.btnTwoText}
                    />
               </div>
            </div>
        </div>
    )
}