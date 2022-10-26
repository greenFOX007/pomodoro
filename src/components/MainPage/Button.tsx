import React, { SyntheticEvent } from "react";
import classNames from 'classnames'

interface IButtonProps {
    text?:string;
    handleClick?:(e:SyntheticEvent)=>void;
    green?:boolean;
    styles?:string;
    type?: "button" | "submit" | "reset" | undefined,
    disabled?:boolean,
}

export function Button ({text,handleClick,green,styles,type,disabled}:IButtonProps){

    const commonStyles = 'px-12 py-5 font-normal leading-4 text-base transition-all'
    
    const classNamesButton = classNames(
        commonStyles,
        {[`text-main-red bg-transparent border-2 ${styles}`]:green===false},
        {[`text-white bg-main-green hover:bg-hover-green ${styles}`]:green===true},
        {[`border-main-red hover:bg-main-red hover:text-white`]:disabled===false},
        {[`disabled:border-gray-C4 disabled:text-gray-C4`]:disabled===true}
    )
    
    return(
        <button 
            onClick={handleClick} 
            disabled={disabled} 
            type={type} 
            className={classNamesButton}>
            {text}
        </button>
    )
}