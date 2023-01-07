import React, { useEffect, useState } from 'react' 
import { IList, IStatList } from '../../storage/StatisticStorage'
import { numOfWeek, numOfWeekNow } from '../../utills/numOfWeek'
import { getStatList } from './StatsPage'




export function WeekChoise (){

    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const [currentWeek, setCurrentWeek] = useState<string|null>('Эта неделя')

    function handleClick (e:React.SyntheticEvent){
        e.preventDefault()
        setIsDropDownOpen(!isDropDownOpen)
        
    }

    function handleClickChoice (e:React.SyntheticEvent){
        e.preventDefault()
        setCurrentWeek(e.currentTarget.textContent)
        getStatList.changeCurrentWeek(e.currentTarget.id)    
    }


    return (
        <div className='w-80 bg-gray-F4 relative'>
            <button onClick={handleClick} className='w-full py-5 px-4 flex justify-between items-center'>
                <span className=''>{currentWeek}</span>
                <div className={`w-3 h-3 border-t-2 border-l-2 border-red-900 ${isDropDownOpen?'rotate-45 translate-y-1':'-rotate-135'} transition-all`}></div>
            </button>
            {isDropDownOpen && (
                <ul style={{filter:'drop-shadow(0px 10px 63px rgba(0, 0, 0, 0.07))'}} className='absolute z-20 w-full bg-inherit fillter'>
                    <li className='border-t-2 border-gray-DE'>
                        <button id={`${numOfWeekNow()}`} onClick={handleClickChoice} className='w-full py-5 px-4 flex justify-between items-center'>Эта неделя</button>
                    </li>
                    <li className='border-t-2 border-gray-DE'>
                        <button id={`${numOfWeekNow()===1?52:numOfWeekNow() - 1}`} onClick={handleClickChoice} className='w-full py-5 px-4 flex justify-between items-center'>Прошлая неделя</button>
                    </li>
                    <li className='border-t-2 border-gray-DE'>
                        <button id={`${numOfWeekNow()===1?51:numOfWeekNow() - 2}`} onClick={handleClickChoice} className='w-full py-5 px-4 flex justify-between items-center'>2 недели назад</button>
                    </li>
            </ul> 
            )} 
        </div>
        
    )
}