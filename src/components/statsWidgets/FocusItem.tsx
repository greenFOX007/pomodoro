import { IStatList } from "../../storage/StatisticStorage";

interface IProps {
    item:IStatList,
}

export function FocusItem ({item}:IProps){
    const focusTime = item?Math.floor(item.doneWorkTime/(item.breakTime+item.doneWorkTime)*100):0
    return(
        <div className="p-6 bg-gray-F4  w-31per h-44 ">
            <div className="w-full h-full bg-focusimg bg-no-repeat bg-right ">
                <div className="text-2xl font-bold mb-5">Фокус</div>
                <div className="text-6xl font-normal">{focusTime}%</div>
            </div>
        </div>
    )
}