interface IProps  {
    time:number,
    dayName:number,
}



export function DailyTimeCount ({time,dayName}:IProps){

    const hours = Math.trunc(time/60/60%60)>=1?`${Math.trunc(time/60/60%60)} часов`:``
    const minuts = Math.trunc(time/60%60)>=1?`${Math.trunc(time/60%60)} минут`:``
    const seconds = Math.trunc(time%60)>=1?`${Math.trunc(time%60)} секунд`:``

    const dayNameArr = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота']

    function checkTime (item:number){
        if(item!==0){
            return `Вы работали над задачами в течение ${hours} ${minuts} ${seconds}`
        }else{
            return 'Нет данных'
        }
    }

    return(
        <div className="p-6 bg-gray-F4 h-64">
            <h3 className="font-bold text-2xl">{dayNameArr[dayName]}</h3>
            <p className="mt-4">{checkTime(time)}</p>
        </div>
    )
}