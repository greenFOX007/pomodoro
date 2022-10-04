import { assoc } from "./assoc"

export const generateRamdomString = ()=> Math.random().toString(36).substring(2,15)

export const assingnId = assoc('id', generateRamdomString())

export const generateID = <O extends object>(obj:O) => assoc('id', generateRamdomString())(obj)


export function generateRamdomID () {return Math.random().toString(36).substring(2,15)}