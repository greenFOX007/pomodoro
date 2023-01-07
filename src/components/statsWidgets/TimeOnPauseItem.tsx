interface IProps {
    time:number,
}

export function TimeOnPauseItem ({time}:IProps){

    const hours = Math.trunc(time/60/60%60)>=1?`${Math.trunc(time/60/60%60)} ч`:``
    const minuts = Math.trunc(time/60%60)>=1?`${Math.trunc(time/60%60)} м`:``
    const seconds = Math.trunc(time%60)>=1?`${Math.trunc(time%60)} с`:``
    return(
        <div className="p-6 bg-gray-F4  w-31per h-44 ">
            <div className="w-full h-full bg-pauseimg bg-no-repeat bg-right ">
                <div className="text-2xl font-bold mb-5">Время на паузе</div>
                <div className="text-6xl font-normal">{time===0?0:`${hours} ${minuts} ${seconds}`}</div>
            </div>
        </div>
    )
}