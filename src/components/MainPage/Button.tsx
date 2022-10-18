import React, { SyntheticEvent } from "react";

interface IButtonProps {
    text?:string;
    handleClick?:(e:SyntheticEvent)=>void;
    green?:boolean;
    styles?:string;
    type?: "button" | "submit" | "reset" | undefined,
    disabled?:boolean,
}

export function Button ({text,handleClick,green,styles,type,disabled}:IButtonProps){
    
    function stylesChoise (){
        if(green){
            return `text-white bg-main-green px-12 text-base leading-4 py-5 font-normal ${styles} hover:bg-hover-green transition-all`
        }else{
            return `text-main-red text-base leading-4 bg-transparent px-12 py-5 font-normal border-2 ${!disabled?'border-main-red hover:bg-main-red hover:text-white transition-all':' disabled:border-gray-C4 disabled:text-gray-C4'}  ${styles}`
        }
    }

    return(
        <button 
            onClick={handleClick} 
            disabled={disabled} 
            type={type} 
            className={stylesChoise()}>
            {text}
        </button>
    )
}