import { useStore } from 'effector-react'
import { useEffect, useState } from 'react' 
import { IList, IStatList, StatListApi } from '../../storage/StatisticStorage'
import { numOfWeek} from '../../utills/numOfWeek'
import { DailyTimeCount } from '../statsWidgets/DailyTimeCount'
import { FocusItem } from '../statsWidgets/FocusItem'
import { PomodorCount } from '../statsWidgets/PomodorCount'
import { StopsItem } from '../statsWidgets/StopsItem'
import { TimeOnPauseItem } from '../statsWidgets/TimeOnPauseItem'
import { WeekDiagram } from '../statsWidgets/WeekDiagram'
import { WeekChoise } from './WeekChoise'

export const getStatList = StatListApi(JSON.parse(localStorage.getItem('StatItem')||'[]'))

// const list:IList<IStatList> = {
//     "3.0.2023":{"doneTasks":2,"doneWorkTime":1380,"breakTime":12,"stops":2},
//     "2.0.2023":{"doneTasks":2,"doneWorkTime":2500,"breakTime":13,"stops":2},
//     "4.0.2023":{"doneTasks":2,"doneWorkTime":1525,"breakTime":14,"stops":2},
//     "6.0.2023":{"doneTasks":2,"doneWorkTime":8500,"breakTime":14,"stops":2},
//     "7.0.2023":{"doneTasks":2,"doneWorkTime":700,"breakTime":14,"stops":2},
//     "8.0.2023":{"doneTasks":2,"doneWorkTime":450,"breakTime":14,"stops":2},
//     "09.0.2023":{"doneTasks":2,"doneWorkTime":5605,"breakTime":14,"stops":2},
//     "31.11.2022":{"doneTasks":2,"doneWorkTime":15,"breakTime":14,"stops":2},
//     "26.11.2023":{"doneTasks":12,"doneWorkTime":123,"breakTime":15,"stops":2},
//     "25.11.2023":{"doneTasks":13,"doneWorkTime":2231,"breakTime":16,"stops":2},
//     "20.11.2023":{"doneTasks":1,"doneWorkTime":1323,"breakTime":17,"stops":2},
//     "19.11.2023":{"doneTasks":5,"doneWorkTime":123,"breakTime":18,"stops":2},
//     "18.11.2023":{"doneTasks":4,"doneWorkTime":1579,"breakTime":19,"stops":2}
//     }

export function StatsPage (){
    const [statValues, setStatValues] = useState<IList<IStatList>>({})
    const statList = useStore(getStatList.$statListitems)
    const currentWeekStore = useStore(getStatList.$currentWeek)
    const currentDay = useStore(getStatList.$currentDay)
    const currentDayName = useStore(getStatList.$currentDayName)

    useEffect(()=>{
        let list = Object.fromEntries(Object.entries(statList).filter((item)=>numOfWeek(item[0]) === Number(currentWeekStore) )) 
        
        setStatValues(list)
    },[currentWeekStore,statList])
    
    
    return (
        <div className='pt-24 pb-12'>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-2xl'>Ваша активность</h2>
                <WeekChoise/>
            </div>
            <div className="w-full mt-7 flex justify-between">
                <div className="w-23per">
                    <DailyTimeCount dayName={Number(currentDayName)} time={statList[currentDay]?statList[currentDay].doneWorkTime:0} />
                    <PomodorCount  donePomodoro={statList[currentDay]?statList[currentDay].doneTasks:0}/>
                </div>
                <div className="w-74per">
                    <WeekDiagram list={statValues}/>
                </div> 
            </div>
            <div className='mt-8 flex justify-between'>
                <FocusItem focus={8} />
                <TimeOnPauseItem time={statList[currentDay]?statList[currentDay].breakTime:0} />
                <StopsItem stops={statList[currentDay]?statList[currentDay].stops:0} />
            </div>
        </div>
    )
}