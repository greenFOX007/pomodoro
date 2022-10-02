import React from "react";


interface IlayoutProps {
    children?: React.ReactNode
  }
  
  export function Layout({children}: IlayoutProps) {
   
   
    return (
      <div className="w-1280 mt-0 mb-0 ml-auto mr-auto">
        {children}
      </div>
    );
  }