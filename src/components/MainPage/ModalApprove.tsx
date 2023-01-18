import React from "react";
import ReactDOM from "react-dom";
import { CloseSVG } from "../../img/SVGicons";
import { Button } from "./Button";


interface IItemID {
    onClose?:(e:React.SyntheticEvent)=>void;
    onDelete?:(e:React.SyntheticEvent)=>void;
}

export function ModalApprove ({onClose,onDelete}:IItemID){
   
    const node = document.querySelector('#modal')
    if (!node) return null;

    return ReactDOM.createPortal((
        <div className="fixed right-0 left-0 top-0 bottom-0 backdrop-brightness-50 flex items-center justify-center">
            <div className="py-6 flex flex-col w-96 h-44 items-center justify-center relative bg-white">
                <div className="font-normal text-2xl mb-6">Удалить задачу?</div>
                <Button handleClick={onDelete} green={false} text={'Удалить'}  styles={'mb-3'}/>
                <button onClick={onClose} className="custom-underline text-base font-light relative">Отмена</button>
                <button onClick={onClose} className="absolute right-3 top-3">
                    <CloseSVG/>
                </button>
            </div> 
        </div>
           
    ),node)
}