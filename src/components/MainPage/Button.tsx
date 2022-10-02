import React, { SyntheticEvent } from "react";

interface IButtonProps {
    text?:string;
    handleClick?:(e:SyntheticEvent)=>void;
    green?:boolean;
    styles?:string;
    type: "button" | "submit" | "reset" | undefined
}

export function Button ({text,handleClick,green,styles,type}:IButtonProps){
    

    return(
        <button onClick={handleClick} type={type} className={green?`text-white bg-main-green px-12 text-base leading-4 py-5 font-normal ${styles} hover:bg-hover-green transition-all`:`text-main-red text-base leading-4 bg-transparent px-12 py-5 font-normal border-2 border-main-red hover:bg-main-red hover:text-white transition-all ${styles}`}>{text}</button>
    )
}