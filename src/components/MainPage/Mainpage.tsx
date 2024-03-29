import { PomodoroTimerContainer } from "../PomodoroTimerContainer";
import { FormAddItem } from "./FormAddItem";

export function Mainpage (){

   
    return(
        <div className="pt-24 flex">
            <div className="w-2/5 w mr-4">
                <h2 className="text-2xl font-bold leading-8 mb-1">Ура! Теперь можно начать работать:</h2>
                <ul className="text-base font-normal mb-6">
                    <li className="red-list-type">Выберите категорию и напишите название текущей задачи</li>
                    <li className="red-list-type">Запустите таймер («помидор»)</li>
                    <li className="red-list-type">Работайте пока «помидор» не прозвонит</li>
                    <li className="red-list-type"> Сделайте короткий перерыв (3-5 минут)</li>
                    <li className="red-list-type">Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</li>
                </ul>
               <FormAddItem/>
            </div>
            <PomodoroTimerContainer />
        </div>
    )
}