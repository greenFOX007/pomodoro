import classNames from "classnames";
import { useStore } from "effector-react";
import React from "react";
import { IList, IStatList } from "../../storage/StatisticStorage";
import { getDay } from "../../utills/getDay";
import { getStatList } from "../StatsPage/StatsPage";


interface IListProps{
    list:IList<IStatList>
}

export function WeekDiagram({list}:IListProps){
    const currentDay = useStore(getStatList.$currentDay)
    const week = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']
    
    let monday = Object.keys(list).filter((item)=>getDay(item) === 1)[0]
    let tuesday = Object.keys(list).filter((item)=>getDay(item) === 2)[0]
    let wednesday = Object.keys(list).filter((item)=>getDay(item) === 3)[0]
    let thursday = Object.keys(list).filter((item)=>getDay(item) === 4)[0]
    let friday = Object.keys(list).filter((item)=>getDay(item) === 5)[0]
    let saturday = Object.keys(list).filter((item)=>getDay(item) === 6)[0]
    let sunday = Object.keys(list).filter((item)=>getDay(item) === 0)[0]

    let weekList = [monday,tuesday,wednesday,thursday,friday,saturday,sunday]

    function handleClick(e:React.SyntheticEvent){
        getStatList.changeCurrentDay(e.currentTarget.id)
        if(e.currentTarget.textContent){
            getStatList.changeCurrentDayName(Number(e.currentTarget.textContent))
        }
    }

    const weekListStyle = classNames(
        'w-77px mr-8 flex justify-center items-center',
    )
    const diagramLayoutLine = classNames(
        'h-83 w-88per border-t flex justify-end border-main-black'
    )

    

    return (
        <div className=" bg-gray-F4  flex items-end flex-col justify-end overflow-hidden">
            <div className=" w-full h-420 flex align-bottom relative overflow-hidden">
                <div className="flex items-end w-full text-2x ml-14">
                    {weekList.map((item,index)=>{
                        if(item){
                            return <button 
                                        onClick={handleClick} 
                                        style={{height:`${list[item].doneWorkTime*0.055}px`,minHeight:'5px'}} 
                                        id={item} 
                                        key={index} 
                                        className={`text-transparent w-77px mr-8 z-10 ${currentDay===item?'bg-main-red':'bg-unactive-red'}`}>
                                        {index+1===7?0:index+1}
                                     </button>
                        }else{
                            return <button 
                                        onClick={handleClick} 
                                        style={{height:`5px`}} 
                                        id='0' 
                                        key={index} 
                                        className="text-transparent w-77px mr-8 bg-gray-99 z-10">
                                        {index+1===7?0:index+1}
                                    </button>
                        }
                    })}
                <ul className="flex flex-col-reverse z-10">
                    <li className="h-85 ml-7 ">
                        <div className="mr-5 text-xs">25 мин</div>
                    </li>
                    <li className="h-85 ml-7 ">
                        <div className="mr-5 text-xs">50 мин</div>
                    </li>
                    <li className="h-85 ml-7 ">
                        <div className="mr-5 text-xs">1 ч 15 мин</div>
                    </li>
                    <li className="h-85 ml-7 ">
                        <div className="mr-5 text-xs">1 ч 40 мин</div>
                    </li>
                </ul>
                </div>
                <ul className="absolute flex flex-col-reverse right-0 top-0 left-0 bottom-0">
                    <li className={diagramLayoutLine}></li>
                    <li className={diagramLayoutLine}></li>
                    <li className={diagramLayoutLine}></li>
                    <li className={diagramLayoutLine}></li>
                </ul>
            </div>  
        
            <div className=" bg-gray-EC w-full">
                <ul className="flex h-12 w-full text-2xl text-gray-99 ml-14">
                    {week.map((item,index)=>{
                       return <li key={index} className={weekListStyle}>{item}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}