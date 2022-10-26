import React from "react";
import { Link } from "react-router-dom";
import logo from '../img/logo.png'


export function Header (){
    return(
        <div className="h-16 flex bg-white shadow-header ">
            <div className="flex items-center justify-between w-1280 mt-0 mb-0 ml-auto mr-auto">
               <Link to='/' style={{backgroundImage:`url(${logo})`}} className="font-normal pl-12 block text-2xl leading-10 text-main-red bg-no-repeat bg-left" >pomodoro_box</Link>
               <Link to="/stats" className="font-normal text-base items-center flex justify-between text-main-red">
                   <svg className="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M6 16H10V0H6V16ZM0 16H4V8H0V16ZM12 5V16H16V5H12Z" fill="#DC3E22"/>
                   </svg>
                   Статистика
               </Link>
            </div>
            
                
        </div>
    )
}