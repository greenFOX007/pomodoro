import img2 from "../../img/tomato2.png"
import img1 from "../../img/tomato1.png"
import classNames from "classnames";

interface IProps {
    donePomodoro:number
}

export function PomodorCount ({donePomodoro}:IProps){

    const mainContainer = classNames(
        'h-44 bg-gray-F4 mt-8',
        {[`flex items-center justify-center`]:donePomodoro!==0}
    )

    return (
        <div className={mainContainer}>    
                <div className="w-full flex flex-col h-full justify-between">
                    {donePomodoro!==0 && (
                        <>
                         <div className="flex flex-row items-center justify-center py-6">
                            <img width={76} src={img1} alt="pomodor"/>
                            <div className="text-2xl text-gray-99 font-bold ml-2"> x {donePomodoro} </div>
                         </div>
                         <div className="bg-main-red w-full h-12 font-extrabold text-white text-2xl flex items-center justify-center">{donePomodoro} Помидора</div>
                        </>
                    )}
                     {donePomodoro ===0 && (
                         <div className="flex flex-row items-center justify-center py-6">
                            <img  src={img2} alt="pomodor"/>
                         </div>
                    )}    
                </div>
        </div>
    )
}