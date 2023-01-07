
interface IProps {
    focus:number,
}

export function FocusItem ({focus}:IProps){
    return(
        <div className="p-6 bg-gray-F4  w-31per h-44 ">
            <div className="w-full h-full bg-focusimg bg-no-repeat bg-right ">
                <div className="text-2xl font-bold mb-5">Фокус</div>
                <div className="text-6xl font-normal">{focus}%</div>
            </div>
        </div>
    )
}