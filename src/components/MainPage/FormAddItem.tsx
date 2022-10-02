import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./Button";


export function FormAddItem (){

    const [value,setValue] = useState('')

   function handleChange (e:ChangeEvent<HTMLInputElement>){
    setValue(e.target.value)
   }

   function handleSubmit (e:FormEvent) {
    e.preventDefault()
    console.log(value)
   }

    return (
        <form onSubmit={handleSubmit} className="">
            <input type={"text"} placeholder={'Название задачи'} onChange={handleChange} value={value} className="bg-gray-F4 block w-96 pl-4 text-base leading-4 py-5 focus:outline-none placeholder:text-gray-99"></input>
            <Button green={true} type={'submit'} text={'Добавить'} styles={'mt-6'} />
        </form>
    )
}