interface IProps {
    stops:number,
}

export function StopsItem ({stops}:IProps){
    return(
        <div className="p-6 bg-gray-F4  w-31per h-44 ">
            <div className="w-full h-full bg-stopsimg bg-no-repeat bg-right ">
                <div className="text-2xl font-bold mb-5">Остановки</div>
                <div className="text-6xl font-normal">{stops}</div>
            </div>
        </div>
    )
}